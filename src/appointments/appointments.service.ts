import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createAppointmentsDTO } from './dto/create-appointments.dto';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { updateAppointmentsDTO } from './dto/update-appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    try {
      const response = await this.prisma.appointments.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      return {
        status: 200,
        response,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async create({ name, date, local }: createAppointmentsDTO) {
    try {
      const formatDate = parse(date, 'dd/MM/yyyy HH:mm', new Date(), {
        locale: ptBR,
      });

      const dateLocalAlreadyExist = await this.prisma.appointments.findFirst({
        where: { date: formatDate, local },
      });

      if (dateLocalAlreadyExist) {
        return {
          status: 409,
          response: 'Já existe uma solicitação para este horário e local',
        };
      }

      const response = await this.prisma.appointments.create({
        data: {
          name,
          date: formatDate,
          local,
        },
      });

      return {
        status: 200,
        response,
      };
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async update(id: number, { date, local, name }: updateAppointmentsDTO) {
    try {
      const formatDate = parse(date, 'dd/MM/yyyy HH:mm', new Date(), {
        locale: ptBR,
      });

      const userId = await this.prisma.appointments.findUnique({
        where: { id },
      });

      const dateLocalAlreadyExist = await this.prisma.appointments.findFirst({
        where: { date: formatDate, local },
      });

      if (!userId) {
        return { status: 404, response: 'Usuário não encontrado' };
      }

      if (dateLocalAlreadyExist) {
        return {
          status: 409,
          response: 'Já existe uma solicitação para este horário e local',
        };
      }

      const response = await this.prisma.appointments.update({
        data: {
          date: formatDate,
          local,
          name,
        },
        where: {
          id,
        },
      });

      return {
        status: 204,
        response,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(id: number) {
    try {
      const userId = await this.prisma.appointments.findUnique({
        where: { id },
      });

      if (!userId) {
        return { status: 404, response: 'Usuário não encontrado' };
      }

      const response = await this.prisma.appointments.delete({
        where: {
          id,
        },
      });

      return {
        status: 204,
        response,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
