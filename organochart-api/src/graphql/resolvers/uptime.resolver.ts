import { Resolver, Query } from '@nestjs/graphql';
import { UptimeService } from 'src/uptime.service';

@Resolver()
export class UptimeResolver {
  constructor(private readonly uptimeService: UptimeService) {}

  @Query(() => String)
  getHealthStatus(): string {
    return 'Service is healthy';
  }
}
