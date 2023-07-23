export class DbMock{
    MockBannerPromotion(){
      return[
        {
            "judul_promosi": "Test judul promosi ",
            "tanggal_awal": "2023-01-01",
            "tanggal_akhir": "2023-02-02",
            "banner": "1689277682_5d209562001cecca.png",
            "isi": "Test isi promosi",
            "url_target": "www.google.com",
            "tags": "Test tag"
        },
        {
            "judul_promosi": "Test judul promosi 2",
            "tanggal_awal": "2023-03-03",
            "tanggal_akhir": "2023-04-04",
            "banner": "1689277682_5d209562001cecca.png",
            "isi": "Test isi promosi",
            "url_target": "www.google.com",
            "tags": "Test tag"
        },
        {
            "judul_promosi": "Test judul promosi 3",
            "tanggal_awal": "2023-05-05",
            "tanggal_akhir": "2023-10-04",
            "banner": "1689277682_5d209562001cecca.png",
            "isi": "Test isi promosi",
            "url_target": "www.google.com",
            "tags": "Test tag"
        }
      ]
    }

    MockUser(){
        return[
            {
                "email": "fauzanrusdi20@gmail.com",
                "username": "rusdi12", 
                "fullname": "fauzan rusdi",
                "password": "rusditest"
            },
            {
                "email": "diana@gmail.com",
                "fullname": "diana hertiyas",
                "username": "diana123", 
                "password": "dianatest"
            }
        ]
      }
}
  