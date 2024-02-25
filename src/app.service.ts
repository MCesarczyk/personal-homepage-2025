import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Backend for <a href="https://cesarczyk.dev" >cesarczyk.dev</a> portfolio up and running 🚀</h1>';
  }
}
