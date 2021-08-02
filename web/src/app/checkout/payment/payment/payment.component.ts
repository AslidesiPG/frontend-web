import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CartItem } from '@models';
import { address, getCartTotal } from '@utils';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem } from 'ngx-paypal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppInitService } from 'src/app/shared/services/app-init.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { AppStorage } from 'src/app/shared/services/storage/app-storage';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { HelperService } from 'src/app/shared/services/helper.service';

declare let window: any;

@UntilDestroy()
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  getCartTotal = getCartTotal;
  cart: any = {};
  subtotal: any;
  total: any;
  addressSelected: any;
  paymentOption = 'paypal';
  payPalConfig?: IPayPalConfig;
  showSuccess: boolean;
  useWallet: boolean;
  address = address;
  orderLording: boolean;
  shippingData: any = [];
  shipping: any;
  pendingOrder: any;
  payUMonyForm: any;
  newOrderItems: {
    product_id: number;
    price: number;
    quantity: number;
    shipping: {
      courier_company_id: any;
      estimated_delivery_days: any;
      rate: any;
      courier_name: any;
    };
    attributes: import("../../../../../../libs/models/src/cart").CartItemAttribute[];
  }[];
  paymentLoading: boolean;

  constructor(
    @Inject(AppStorage) private appStorage: Storage,
    private cartService: CartService,
    private orderService: OrderService,
    private appInitService: AppInitService,
    private settingsService: SettingsService,
    private helperService: HelperService,
    private router: Router,
    private renderer: Renderer2,
  ) { }


  ngOnInit(): void {
    this.initConfig();
    this.cartService.$cartItems
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.cartItems = res;
        if (this.cartItems?.length < 1) {
          this.router.navigate(['/cart']);
          return;
        }
      });

    this.cartService.$address
      .pipe(untilDestroyed(this))
      .subscribe((res) => {

        this.addressSelected = res;
        // this.shippingCharge(this.addressSelected, this.cartItems, 0)

      });

    this.cartService.$cart
      .pipe(untilDestroyed(this))
      .subscribe((cart) => {
        this.cart = cart;
        this.total = cart.total + cart.shipping - cart.coupon_discount;
      });

  }




  async paymentType(value: any) {
    this.paymentOption = value;
    if (value === 'paypal' || 'payumoney') {
      this.shippingCharge(this.addressSelected, this.cartItems, 0)
    }
    if (value == 'cod') {
      this.shippingCharge(this.addressSelected, this.cartItems, 1)
    }
    /* else if (value === 'payumoney') {
       this.createPangingOrder();
    } */
  }

  createPangingOrder() {
    this.newOrderItems = this.cartItems.map((cartItem) => {
      const shipping = {
        courier_company_id: cartItem.shipping.courier_company_id,
        estimated_delivery_days: cartItem.shipping.estimated_delivery_days,
        rate: cartItem.shipping.rate,
        courier_name: cartItem.shipping.courier_name,
      };
      return {
        product_id: cartItem.product_id,
        price: cartItem.price,
        quantity: cartItem.quantity,
        shipping,
        attributes: cartItem.attributes,
      };
    });

    const request: any = {
      address_id: this.addressSelected.id,
      payment_method: this.paymentOption,
      notes: '',
      deliveryMaxDay: this.cart?.days,
      coupon_id: this.cart?.coupon?.coupon?.id,
      coupon_discount_amount: this.cart?.coupon_discount,
      items: this.newOrderItems,
      sub_total: this.cart?.total,
      total: getCartTotal(this.cart),
      use_wallet: this.useWallet,
    };
    return this.orderService.pendingOrder(request).then((resp: any) => {
      this.pendingOrder = resp.data;
    })
  }

  async launchBOLT() {
    this.paymentLoading = true;
    await this.createPangingOrder();
    const data = await this.payUMony();
    //  console.log(data);

    //   var fr = `<input type="hidden" name="key" value="${data.params.key}" />
    //   <input type="hidden" name="hash" value="${data.params.hash}" />
    //   <input type="hidden" name="txnid" value="${data.params.txnid}" />
    //   <input type="hidden" name="amount" value="${data.params.amount}" />
    //   <input type="hidden" name="firstname" value="${data.params.firstname}" />
    //   <input type="hidden" name="email" value="${data.params.email}" />
    //   <input type="hidden" name="phone" value="${data.params.phone}" />
    //   <input type="hidden" name="service_provider" value="payu_paisa" />
    //   <input type="hidden" name="furl" value="${data.params.furl}" />
    //   <input type="hidden" name="surl" value="${data.params.surl}" />
    //   <input type="hidden" name="productinfo" value="${data.params.productinfo}" />`;

    let form = this.renderer.createElement("form");
    form.action = data.action;
    form.method = 'post';

    let arr = [
      { key: 'key', value: data.params.key },
      { key: 'hash', value: data.params.hash },
      { key: 'txnid', value: data.params.txnid },
      { key: 'amount', value: data.params.amount },
      { key: 'firstname', value: data.params.firstname },
      { key: 'email', value: data.params.email },
      { key: 'phone', value: data.params.phone },
      { key: 'service_provider', value: 'payu_paisa' },
      { key: 'furl', value: data.params.furl },
      { key: 'surl', value: data.params.surl },
      { key: 'productinfo', value: data.params.productinfo }
    ];
    for (let elem of arr) {
      let temp = this.renderer.createElement('input');
      temp.type = 'hidden';
      temp.value = elem.value;
      temp.name = elem.key;
      this.renderer.appendChild(form, temp);
    }




    // form.innerHtml = fr;


    this.renderer.appendChild(document.body, form);
    console.log(form);
    form.submit();

    // <input type="hidden" name = "udf5" value = "${data?.params?.udf5}" />
    //   <input type="hidden" name = "mihpayid" value = "${data?.params?.mihpayid}" />
    //     <input type="hidden" name = "status" value = "${data?.params?.status}" />


    // window.bolt.launch(data.params, {
    //   responseHandler: function (BOLT) {
    //     console.log(BOLT.response.txnStatus);
    //     if (BOLT.response.txnStatus != 'CANCEL') {
    //       const updateOrderRequest: any = {
    //         bolt: BOLT.response,
    //         id: this.pendingOrder.id,
    //       }
    //       this.orderService.updateOrder(updateOrderRequest).then((resp: any) => {
    //         this.successRedirect(resp.data.id);
    //       }).finally(() => {
    //         this.paymentLoading = false;
    //       })

    //     }
    //   },
    //   catchException: function (BOLT) {
    //     // alert(BOLT.message);
    //     this.paymentLoading = false;
    //   }
    // });
    this.paymentLoading = false;
  }

  async shippingCharge(address, cartItems, codPrice) {

    //if (address?.country_id != '101') {
    //this.orderLording = true;

    this.paymentLoading = true;
    for (let index = 0; index < cartItems?.length; index++) {
      const item = cartItems[index];
      const weight = (item?.product?.weight * item?.quantity);
      if (!item?.product?.shipping_free) {
        const request = {
          pickup_postcode: item?.product?.user?.vendor_profile?.zip_code,
          delivery_postcode: address?.zip_code,
          weight: weight,
          cod: codPrice,
        }
        await this.cartService.getShippingPrice(request).then((resp: any) => {
          item.shipping = resp.data.available_courier_companies[0];

        }).catch((error) => {
          this.helperService.errorMessage('shipping not available');
        })
      }
    }
    // this.orderLording = false;
    this.paymentLoading = false;
    this.cartService.cartItems = cartItems;
    //}
  }

  sendOrder(mode = 'cod', data?: any) {
    //this.orderLording = true;
    this.paymentLoading = true;
    const orderItems = this.cartItems.map((cartItem) => {
      const shipping = {
        courier_company_id: cartItem.shipping.courier_company_id,
        estimated_delivery_days: cartItem.shipping.estimated_delivery_days,
        rate: cartItem.shipping.rate,
        courier_name: cartItem.shipping.courier_name,
      };
      return {
        product_id: cartItem.product_id,
        price: cartItem.price,
        quantity: cartItem.quantity,
        shipping,
        attributes: cartItem.attributes,
      };
    });

    const request: any = {
      address_id: this.addressSelected.id,
      payment_method: this.paymentOption,
      notes: '',
      deliveryMaxDay: this.cart?.days,
      coupon_id: this.cart?.coupon?.coupon?.id,
      coupon_discount_amount: this.cart?.coupon_discount,
      items: orderItems,
      sub_total: this.cart?.total,
      total: getCartTotal(this.cart),
      use_wallet: this.useWallet,
    };
    console.log(request)
    if (mode === 'paypal') {
      request.payment_method = 'paypal';
      request.order_id = data.orderID;
    }

    this.orderService.saveOrder(request).then((req: any) => {
      this.successRedirect(req.data.id);
    }).catch((error) => {
      this.helperService.errorMessage(error.error);
    }).finally(() => this.paymentLoading = false);
  }

  successRedirect(id) {
    this.appStorage.removeItem('cart');
    this.appStorage.removeItem('cartItems');
    this.cartService.cart = {};
    this.cartService.cartItems = [];
    this.router.navigate(['/order-details/', id]);
  }
  private createPaypalOrder(data) {
    //const settings = this.appInitService.settings;
    let currencyCode;
    if (this.settingsService.currency === 'rs') {
      currencyCode = 'INR'
    }
    else {
      currencyCode = 'USD'
    }

    const items: ITransactionItem[] = this.cartItems.map((cartItem): ITransactionItem => {
      return {
        name: cartItem.product.name,
        quantity: cartItem.quantity + '',
        unit_amount: {
          currency_code: currencyCode,
          value: cartItem.price + '',
        },
      };
    });

    let shipping = this.cart?.shipping || 0;

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          // items,
          //shipping: shipping,
          amount: {
            currency_code: currencyCode,
            value: getCartTotal(this.cart),
          },
        }
      ]
    };

    return orderData as ICreateOrderRequest;
  }
  private initConfig() {
    const settings = this.appInitService.settings;

    let currencyCode;
    if (this.settingsService.currency === 'rs') {
      currencyCode = 'INR'
    }
    else {
      currencyCode = 'USD'
    }

    this.payPalConfig = {
      currency: currencyCode,
      clientId: settings.paypal.client_id,
      createOrderOnClient: this.createPaypalOrder.bind(this),
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          this.sendOrder('paypal', data);
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


  payUMony() {
    const pendingOrderData = this.pendingOrder;

    const request = {
      order_id: pendingOrderData.id,
      order_display_id: pendingOrderData.order_display_id,
      quantity: pendingOrderData.quantity,
      total: getCartTotal(this.cart),
    }
    return this.orderService.payUMonyPayment(request).then((resp: any) => {
      this.payUMonyForm = resp;
      return resp;
    });
  }


  ngOnDestroy(): void { }

}
