'use strict';

const post_details = [
		{
			"id": 85,
			"post_id": "POS_6pvdjjlff55x9h",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 12,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 360000
		},
		{
			"id": 86,
			"post_id": "POS_6pvdjjlff55x9h",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 87,
			"post_id": "POS_6pvpbslfifl8tv",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 88,
			"post_id": "POS_6pvpbslfifl8tv",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 89,
			"post_id": "POS_6pvpbslfifl8tv",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 90,
			"post_id": "POS_6pvpbslfifl8tv",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 91,
			"post_id": "POS_6pvpbslfifl8tv",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 92,
			"post_id": "POS_6pvpbslfifvqdh",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 300000
		},
		{
			"id": 93,
			"post_id": "POS_6pvpbslfifvqdh",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 94,
			"post_id": "POS_6pvpbslfify7po",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 12,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 300000
		},
		{
			"id": 95,
			"post_id": "POS_6pvpbslfifzbo7",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 96,
			"post_id": "POS_6pvpbslfig3l8s",
			"service_id": "SER_g2pcl8pkl8sxyv85",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 10000
		},
		{
			"id": 97,
			"post_id": "POS_6pvpbslfig3l8s",
			"service_id": "SER_g2pclaq0l8sxxwh5",
			"value": 6,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 162000
		},
		{
			"id": 98,
			"post_id": "POS_6pvpbslfig4yfz",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 99,
			"post_id": "POS_6pvpbslfig7ouj",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 12,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 300000
		},
		{
			"id": 100,
			"post_id": "POS_6pvpbslfifl811",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 101,
			"post_id": "POS_6pvpbslfifl811",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 102,
			"post_id": "POS_6pvpbslfifl811",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 103,
			"post_id": "POS_6pvpbslfifl811",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 104,
			"post_id": "POS_6pvpbslfifl811",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 105,
			"post_id": "POS_6pvpbslfifl812",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 106,
			"post_id": "POS_6pvpbslfifl812",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 107,
			"post_id": "POS_6pvpbslfifl812",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 108,
			"post_id": "POS_6pvpbslfifl812",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 109,
			"post_id": "POS_6pvpbslfifl812",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 110,
			"post_id": "POS_6pvpbslfifl813",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 111,
			"post_id": "POS_6pvpbslfifl813",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 112,
			"post_id": "POS_6pvpbslfifl813",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 113,
			"post_id": "POS_6pvpbslfifl813",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 114,
			"post_id": "POS_6pvpbslfifl813",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 115,
			"post_id": "POS_6pvpbslfifl814",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 116,
			"post_id": "POS_6pvpbslfifl814",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 117,
			"post_id": "POS_6pvpbslfifl814",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 118,
			"post_id": "POS_6pvpbslfifl814",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 119,
			"post_id": "POS_6pvpbslfifl814",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 120,
			"post_id": "POS_6pvpbslfifl815",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 121,
			"post_id": "POS_6pvpbslfifl815",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 122,
			"post_id": "POS_6pvpbslfifl815",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 123,
			"post_id": "POS_6pvpbslfifl815",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 124,
			"post_id": "POS_6pvpbslfifl815",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 125,
			"post_id": "POS_6pvpbslfifl816",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 126,
			"post_id": "POS_6pvpbslfifl816",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 127,
			"post_id": "POS_6pvpbslfifl816",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 128,
			"post_id": "POS_6pvpbslfifl816",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 129,
			"post_id": "POS_6pvpbslfifl816",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 130,
			"post_id": "POS_6pvpbslfifl817",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 131,
			"post_id": "POS_6pvpbslfifl817",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 132,
			"post_id": "POS_6pvpbslfifl817",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 133,
			"post_id": "POS_6pvpbslfifl817",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 134,
			"post_id": "POS_6pvpbslfifl817",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 135,
			"post_id": "POS_6pvpbslfifl818",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 136,
			"post_id": "POS_6pvpbslfifl818",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 137,
			"post_id": "POS_6pvpbslfifl818",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 138,
			"post_id": "POS_6pvpbslfifl818",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 139,
			"post_id": "POS_6pvpbslfifl818",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 140,
			"post_id": "POS_6pvpbslfifl819",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 141,
			"post_id": "POS_6pvpbslfifl819",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 142,
			"post_id": "POS_6pvpbslfifl819",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 143,
			"post_id": "POS_6pvpbslfifl819",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 144,
			"post_id": "POS_6pvpbslfifl819",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 145,
			"post_id": "POS_6pvpbslfifl820",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 146,
			"post_id": "POS_6pvpbslfifl820",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 147,
			"post_id": "POS_6pvpbslfifl820",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 148,
			"post_id": "POS_6pvpbslfifl820",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 149,
			"post_id": "POS_6pvpbslfifl820",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 150,
			"post_id": "POS_6pvpbslfifl821",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 151,
			"post_id": "POS_6pvpbslfifl821",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 152,
			"post_id": "POS_6pvpbslfifl821",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 153,
			"post_id": "POS_6pvpbslfifl821",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 154,
			"post_id": "POS_6pvpbslfifl821",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 155,
			"post_id": "POS_6pvpbslfifl822",
			"service_id": "SER_g2pcl1h8l8sxxnhw",
			"value": 10,
			"service_seq_nb": 0,
			"multiple_field_value": 2,
			"total": 600000
		},
		{
			"id": 156,
			"post_id": "POS_6pvpbslfifl822",
			"service_id": "SER_g2pcl2i8l8sxyey5",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 157,
			"post_id": "POS_6pvpbslfifl822",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 5,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 150000
		},
		{
			"id": 158,
			"post_id": "POS_6pvpbslfifl822",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 25000
		},
		{
			"id": 159,
			"post_id": "POS_6pvpbslfifl822",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 500000
		},
		{
			"id": 160,
			"post_id": "POS_6pvptflibwf7sb",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 12,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 360000
		},
		{
			"id": 161,
			"post_id": "POS_6pvptflibwf7sb",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 15000
		},
		{
			"id": 162,
			"post_id": "POS_6pvptflibwg83v",
			"service_id": "SER_g2pcl940l8sxyo3l",
			"value": 1,
			"service_seq_nb": 2,
			"multiple_field_value": 1,
			"total": 20000
		},
		{
			"id": 163,
			"post_id": "POS_6pvptflibwg83v",
			"service_id": "SER_g2pclaq0l8sxxwh5",
			"value": 12,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 324000
		},
		{
			"id": 164,
			"post_id": "POS_6pvptflibwhbil",
			"service_id": "SER_g2pcl714l8sxxdfr",
			"value": 20,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 600000
		},
		{
			"id": 165,
			"post_id": "POS_6pvptflibwhbil",
			"service_id": "SER_g2pcla8gl8sxwykf",
			"value": 12,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 300000
		},
		{
			"id": 166,
			"post_id": "POS_6pvptflibwi5we",
			"service_id": "SER_6pvdf4lgz8lo28",
			"value": 2,
			"service_seq_nb": 0,
			"multiple_field_value": 1,
			"total": 120000
		},
		{
			"id": 167,
			"post_id": "POS_6pvptflibwi5we",
			"service_id": "SER_g2pcl8pkl8sxyv85",
			"value": 1,
			"service_seq_nb": 1,
			"multiple_field_value": 1,
			"total": 10000
		}
	];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkInsert('post_detail', post_details, {});
	// enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('post_detail', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
