import { Controller, Get, HttpCode } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  async health() {
    let db = true;

    try {
      // ping simples à BD (Postgres)
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      db = false;
    }

    return {
      status: db ? 'ok' : 'degraded',
      checks: { db },
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
