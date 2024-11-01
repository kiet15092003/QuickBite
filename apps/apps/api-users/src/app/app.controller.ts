// import { Controller, Get } from '@nestjs/common';

// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getData() {
//     return this.appService.getData();
//   }
// }
import { Controller } from '@nestjs/common';
import { UsersService } from './app.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
