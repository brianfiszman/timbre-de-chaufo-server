import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({nullable: true})
  image_url: string;
}