// galleries.module.ts
import { Module } from '@nestjs/common';
import { GalleriesRepository } from './galleries.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './models/gallery.entity'; // Assure-toi que la bonne entité est importée

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])], // Importer l'entité
  providers: [GalleriesRepository], // Fournir le GalleriesRepository
  exports: [GalleriesRepository], // Exposer le GalleriesRepository pour d'autres modules
})
export class GalleriesModule {}
