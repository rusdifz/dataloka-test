import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn } from "typeorm";

@Entity({ schema: "public", name: 't_user' })
export class UserEntity { 
    @PrimaryGeneratedColumn({ type: 'int' })
    id_user: number
    @Column({ type: "varchar", length: 200 })
    username: string
    @Column({ type: "varchar", length: 200, default: null})
    fullname: string
    @Column({ type: "varchar", length: 200 })
    email: Date
    @Column({ type: "varchar", length: 200 })
    password: string
    @CreateDateColumn({ type: "timestamp"})
    created_at: Date
    @CreateDateColumn({ type: "timestamp"})
    updated_at: Date
    @DeleteDateColumn({ type: "timestamp", default: null })
    deleted_at: Date
}