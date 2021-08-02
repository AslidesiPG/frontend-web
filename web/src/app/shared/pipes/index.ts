import { AssetsPath } from './image';
import { FilterPipe } from './filter.pipe';
import { UpdateAnchor, SafeHtmlPipe, TruncatePipe, Nl2BrPipe } from './text';
import { StrToDatePipe } from './str-to-date.pipe';
import { SafePipe } from './safe.pipe';
import { FileSizePipe } from './file-size.pipe';
import { CurrencyPipe } from './currency.pipe';
import { DiscountPipe } from './discount.pipe';

const Pipes = [
    AssetsPath,
    FilterPipe,
    UpdateAnchor,
    SafeHtmlPipe,
    TruncatePipe,
    StrToDatePipe,
    Nl2BrPipe,
    SafePipe,
    FileSizePipe,
    CurrencyPipe,
    DiscountPipe,
];

export { Pipes };
