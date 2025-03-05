import { forwardRef, Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  imports:[
    forwardRef(() => AgentModule)
  ],
  providers: [OpenaiService],
  controllers: [OpenaiController],
  exports:[OpenaiService]
})
export class OpenaiModule {}
