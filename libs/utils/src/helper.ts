
export function address(obj: any) {
  return [
    obj.first_name + ' ' + obj.last_name,
    obj.addressline1,
    obj.addressline2,
    [obj.city.name, obj.state.name, obj.zip_code].join(', ')
  ].join('\n')
}

export function getCartTotal(cart){
  let total = cart.total;
  if(cart.coupon){
    total = total - cart.coupon_discount;
  }
  if (cart.shipping) {
    total = total + cart.shipping;
  }
  return total;
}