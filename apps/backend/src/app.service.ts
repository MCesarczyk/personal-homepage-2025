import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Backend for <a href="https://cesarczyk.dev" >cesarczyk.dev</a> portfolio up and running 🚀🚀🚀</h1>\
    <p><h3>Docs for JWT authorized endpoints available at <a href="${process.env.PUBLIC_URL}/docs" >${process.env.PUBLIC_URL}/docs</a></h3></p>\
    <p><h3>Docs for Public/Api key authorized endpoints available at <a href="${process.env.PUBLIC_URL}/docs-public" >${process.env.PUBLIC_URL}/docs-public</a></h3></p>`;
  }
}
