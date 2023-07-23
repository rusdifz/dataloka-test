import { IsNotEmpty, IsOptional, IsEmail, IsUrl } from "class-validator";

export class CreatePromotion {
    
    @IsNotEmpty()
    judul_promosi: string

    @IsNotEmpty()
    tanggal_awal: Date
    
    @IsNotEmpty()
    tanggal_akhir: Date
    
    @IsNotEmpty()
    banner: string
    
    @IsNotEmpty()
    isi: string
    
    @IsNotEmpty()
    @IsUrl()
    url_target: string
    
    @IsNotEmpty()
    tags: string
    
    @IsOptional()
    created_by?: string
    
}

export class UpdatePromotion {
    
    @IsNotEmpty()
    id_banner_promosi: number

    @IsNotEmpty()
    judul_promosi: string

    @IsNotEmpty()
    tanggal_awal: Date
    
    @IsNotEmpty()
    tanggal_akhir: Date
    
    @IsNotEmpty()
    banner: string
    
    @IsNotEmpty()
    isi: string
    
    @IsNotEmpty()
    @IsUrl()
    url_target: string
    
    @IsNotEmpty()
    tags: string
    
    @IsOptional()
    updated_by?: string
   
}
