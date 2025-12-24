export {};

declare global {
  interface EthereumProvider {
    request: (...args: any[]) => Promise<any>;
    [key: string]: any;
  }

  interface Window {
    ethereum?: EthereumProvider;
  }
}
