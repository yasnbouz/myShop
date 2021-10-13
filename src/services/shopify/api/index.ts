import { fetcher } from '../lib/shopifyClient';
import {
  GetProductsInCollectionQueryVariables,
  GetProductsInCollectionQuery,
  GetProductQueryVariables,
  GetProductQuery,
  GetProductDocument,
  GetProductsSlugsQuery,
  GetProductsSlugsDocument,
  GetProductsInCollectionDocument,
} from '../generated/types';

export function getProductsInCollection(variables: GetProductsInCollectionQueryVariables) {
  return fetcher<GetProductsInCollectionQuery, GetProductsInCollectionQueryVariables>(GetProductsInCollectionDocument, variables);
}

export function getProduct(variables: GetProductQueryVariables) {
  return fetcher<GetProductQuery, GetProductQueryVariables>(GetProductDocument, variables);
}
export async function getProductsSlugs() {
  return fetcher<GetProductsSlugsQuery, unknown>(GetProductsSlugsDocument)();
}
