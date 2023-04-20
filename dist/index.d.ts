type Response = string;
declare function helloWorld(name: string): Promise<Response>;

declare function sayHello(): Promise<void>;

export { Response, sayHello as default, helloWorld };
