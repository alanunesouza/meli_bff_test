import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class getProductsInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const dataWrapper = {
          author: {
            name: 'Alan',
            lastname: 'Souza',
          },
          items: data.results
            ? data.results.map((item) => {
                return {
                  id: item.id,
                  title: item.title,
                  price: {
                    currency:
                      item.prices && item.prices.prices[0]
                        ? item.prices.prices[0]['currency_id']
                        : null,
                    amount: parseInt(item.price.toString().split('.')[0]),
                    decimals: parseInt(item.price.toString().split('.')[1]),
                  },
                  picture: item.thumbnail.replace('-I', '-O'),
                  condition: item.condition,
                  free_shipping: item.shipping['free_shipping'],
                  state: item.seller_address.state.name,
                };
              })
            : [],
          categories:
            data.filters && data.filters[0]
              ? data.filters[0].values[0]['path_from_root'].map(
                  (category) => category.name,
                )
              : [],
        };

        data = dataWrapper;

        return data;
      }),
    );
  }
}

@Injectable()
export class getProductDetailsInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const { product, description } = data;

        const dataWrapper = {
          author: {
            name: 'Alan',
            lastname: 'Souza',
          },
          item: {
            id: product.id,
            title: product.title,
            price: {
              currency: product.currency_id,
              amount: parseInt(product.price.toString().split('.')[0]),
              decimals: parseInt(product.price.toString().split('.')[1]),
            },
            picture: product.thumbnail.replace('-I', '-O'),
            condition:
              product.condition === 'new' ? 'Nuevo' : product.condition,
            free_shipping: product.shipping['free_shipping'],
            state: product.seller_address.state.name,
            sold_quantity: product.sold_quantity,
            description: description.plain_text,
          },
        };

        data = dataWrapper;

        return data;
      }),
    );
  }
}
