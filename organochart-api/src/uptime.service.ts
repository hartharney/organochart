// src/uptime.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UptimeService {
  private readonly logger = new Logger(UptimeService.name);
  private readonly startedAt = new Date();

  getCurrentHealthStatus(): { status: string; uptime: string } {
    const now = new Date();
    const uptimeMs = now.getTime() - this.startedAt.getTime();
    const uptimeSec = Math.floor(uptimeMs / 1000);
    this.logger.log(`✅ Health checked: up for ${uptimeSec}s`);
    return {
      status: 'ok',
      uptime: `${uptimeSec}s`,
    };
  }
}
