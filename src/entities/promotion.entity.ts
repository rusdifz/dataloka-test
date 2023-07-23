import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn } from "typeorm";

@Entity({ schema: "public", name: 't_banner_promosi' })
export class PromotionEntity { 
    @PrimaryGeneratedColumn({ type: 'int'})
    id_banner_promosi: number
    @Column({ type: "varchar", length: 200, default: null})
    judul_promosi: string
    @CreateDateColumn({ type: "timestamp", default: null })
    tanggal_awal: Date
    @CreateDateColumn({ type: "timestamp", default: null })
    tanggal_akhir: Date
    @Column({ type: "varchar", length: 100, default: null})
    banner: string
    @Column({ type: "text", default: null})
    isi: string
    @Column({ type: "varchar", length: 100, default: null})
    url_target: string
    @Column({ type: "varchar", length: 100, default: null})
    tags: string
    @Column({ type: "boolean", default: false})
    deleted: boolean
    @Column({ type: "varchar", length: 100, default: null})
    created_by: string
    @CreateDateColumn({ type: "timestamp"})
    created_at: Date
    @Column({ type: "varchar", length: 100, default: null})
    updated_by: string
    @CreateDateColumn({ type: "timestamp"})
    updated_at: Date
}