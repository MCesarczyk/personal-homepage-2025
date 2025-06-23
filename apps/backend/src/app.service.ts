import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Backend for <a href="https://cesarczyk.dev" >cesarczyk.dev</a> portfolio up and running 🚀🚀🚀</h1>\
    <p><h3>Docs available at <a href="${process.env.PUBLIC_URL}/docs" >${process.env.PUBLIC_URL}/docs</a></h3></p>`;
  }
}
