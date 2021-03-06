import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlatformEntity } from "../../platform/models/platform.entity";
import { EventUserEntity } from "../../event-user/models/event-user.entity";
import { DateEntity } from "../../event-user/models/date.entity";

@Entity()
@ObjectType()
export class EventEntity{
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  eventId: string;

  @Field({nullable: true})
  @OneToOne(type => DateEntity)
  @JoinColumn()
  optimalDate: DateEntity;

  @OneToOne(type => PlatformEntity, {eager: true, cascade: true})
  @JoinColumn()
  @Field(type => PlatformEntity, {nullable: true})
  optimalPlatform: PlatformEntity

  @Column({nullable: true})
  @Field(type => Int)
  voted_count: number;

  @OneToMany(type => EventUserEntity, eventUser => eventUser.event, {cascade: true})
  @Field(type => [EventUserEntity])
  users: EventUserEntity[];

  @OneToMany(type => PlatformEntity, platform => platform.event, {cascade: false})
  @Field(type => [PlatformEntity])
  platforms: PlatformEntity[];

  @OneToMany(type => DateEntity, date => date.event, {cascade: ["insert", "update"]})
  @Field(type => [DateEntity], {nullable: true})
  dates: DateEntity[]
}