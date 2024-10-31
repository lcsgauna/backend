import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { createAppointmentsDTO } from './dto/create-appointments.dto';
import { AppointmentsService } from './appointments.service';
import { updateAppointmentsDTO } from './dto/update-appointments.dto';
import { Response } from 'express';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAllAppointments(@Res() res: Response) {
    const { status, response } = await this.appointmentsService.list();
    return res.status(status).send(response);
  }

  @Post()
  async createAppointments(
    @Body() { name, date, local }: createAppointmentsDTO,
    @Res() res: Response,
  ) {
    const { status, response } = await this.appointmentsService.create({
      name,
      date,
      local,
    });
    return res.status(status).send({ response });
  }

  @Put(':id')
  async updateAppointments(
    @Param('id', ParseIntPipe) id: number,
    @Body() { date, local, name }: updateAppointmentsDTO,
    @Res() res: Response,
  ) {
    const { status, response } = await this.appointmentsService.update(id, {
      date,
      local,
      name,
    });
    return res.status(status).send({ response });
  }

  @Delete(':id')
  async deleteAppointments(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const { status, response } = await this.appointmentsService.delete(id);
    return res.status(status).send({ response });
  }
}
