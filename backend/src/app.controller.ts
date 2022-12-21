import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ethers } from 'ethers';
import { AppService } from './app.service';
import { AccountDto } from './dto/account.dto';
import { PoolDto } from './dto/pool.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() accountDto: AccountDto) {
    console.log(12, accountDto)
    if (!('address' in accountDto)) {
      throw new BadRequestException('No account address was provided.');
    }
    if (ethers.utils.isAddress(accountDto.address) === false) {
      throw new BadRequestException('The provided account address is not valid.');
    }
    return this.appService.createAccount(accountDto);
  }

  @Get()
  findAll() {
    return this.appService.findAllAccount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOneAccount(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() accountDto: AccountDto) {
    return this.appService.updateAccount(id, accountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.removeAccount(id);
  }
}

@Controller('pool')
export class PoolController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() poolDto: PoolDto) {
    console.log(50, poolDto)
    if (!('pool_address' in poolDto)) {
      throw new BadRequestException('No pool address was provided.');
    }
    if (ethers.utils.isAddress(poolDto.pool_address) === false) {
      throw new BadRequestException('The provided pool address is not valid.');
    }

    if (!('owner' in poolDto)) {
      throw new BadRequestException('No pool owner was provided.');
    }
    // if (ethers.utils.isAddress(poolDto.owner) === false) {
    //   throw new BadRequestException('The provided owner address is not valid.');
    // }
    return this.appService.createPool(poolDto);
  }

  @Get()
  findAll() {
    return this.appService.findAllPool();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOnePool(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() poolDto: PoolDto) {
    return this.appService.updatePool(id, poolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.removePool(id);
  }
}
