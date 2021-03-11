import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LIMIT_DEFAULT = '4';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getProducts(productName: { search: string }): Promise<Observable<any>> {
    const url = `${process.env.ENDPOINT_MELI}/sites/MLA/search?q=${productName}&limit=${LIMIT_DEFAULT}`;
    const products = await this.httpService
      .get(url)
      .pipe(map((resp) => resp.data))
      .toPromise();

    return products;
  }

  async getProductDetails(id: string): Promise<any> {
    const urlProduct = `${process.env.ENDPOINT_MELI}/items/${id}`;
    const urlProductDetails = `${process.env.ENDPOINT_MELI}/items/${id}/description`;

    const [product, description] = await Promise.all([
      this.httpService
        .get(urlProduct)
        .pipe(map((resp) => resp.data))
        .toPromise(),
      this.httpService
        .get(urlProductDetails)
        .pipe(map((resp) => resp.data))
        .toPromise(),
    ]);

    return { product, description };
  }
}
