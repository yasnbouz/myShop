import { shopifyClient } from '../lib/shopifyClient';
import {
  GetProductsInCollectionQueryVariables,
  GetProductsInCollectionQuery,
  GetProductQueryVariables,
  GetProductQuery,
  GetProductDocument,
  GetProductsSlugsQuery,
  GetProductsSlugsDocument,
  CheckoutCreateDocument,
  CheckoutCreateMutationVariables,
  GetProductsInCollectionDocument,
} from '../generated/types';

export function getProductsInCollection(variables: GetProductsInCollectionQueryVariables): Promise<GetProductsInCollectionQuery> {
  return shopifyClient.request(GetProductsInCollectionDocument, variables);
}

export function getProduct(variables: GetProductQueryVariables): Promise<GetProductQuery> {
  return shopifyClient.request(GetProductDocument, variables);
}
export function getProductsSlugs(): Promise<GetProductsSlugsQuery> {
  return shopifyClient.request(GetProductsSlugsDocument);
}
export function createCheckout(variables: CheckoutCreateMutationVariables) {
  return shopifyClient.request(CheckoutCreateDocument, variables);
}
