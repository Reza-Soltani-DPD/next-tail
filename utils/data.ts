const data: data = {
	users:[
		{
			email:'reza@gmail.com',
			name:'reza',
			password:'123456',
		}

	],
	products: [
		{
			name: 'Free Shirt',
			slug: 'free-shirt',
			category: 'Shirts',
			image: '/images/shirt1.jpg',
			price: 70,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 8,
			countInStock: 20,
			description: 'A popular shirt',
		},
		{
			name: 'Fit Shirt',
			slug: 'fit-shirt',
			category: 'Shirts',
			image: '/images/shirt2.jpg',
			price: 80,
			brand: 'Adidas',
			rating: 3.2,
			numReviews: 10,
			countInStock: 20,
			description: 'A popular shirt',
		},
		{
			name: 'Slim Shirt',
			slug: 'slim-shirt',
			category: 'Shirts',
			image: '/images/shirt3.jpg',
			price: 90,
			brand: 'Raymond',
			rating: 4.5,
			numReviews: 3,
			countInStock: 20,
			description: 'A popular shirt',
		},
		{
			name: 'Golf Pants',
			slug: 'golf-pants',
			category: 'Pants',
			image: '/images/pants1.jpg',
			price: 90,
			brand: 'Oliver',
			rating: 2.9,
			numReviews: 13,
			countInStock: 20,
			description: 'Smart looking pants',
		},
		{
			name: 'Fit Pants',
			slug: 'fit-pants',
			category: 'Pants',
			image: '/images/pants2.jpg',
			price: 95,
			brand: 'Zara',
			rating: 3.5,
			numReviews: 7,
			countInStock: 20,
			description: 'A popular pants',
		},
		{
			name: 'Classic Pants',
			slug: 'classic-pants',
			category: 'Pants',
			image: '/images/pants3.jpg',
			price: 75,
			brand: 'Casely',
			rating: 2.4,
			numReviews: 14,
			countInStock: 20,
			description: 'A popular pants',
		},
	],
};

export default data;
export interface product{
	id?:string;
	slug: string;
	name: string;
	image: string;
	brand: string;
	price: number;
	category?: string;
	rating?: number;
	numReviews?: number;
	countInStock: number;
	description?: string;
	quantity?:number
}
export interface user{
	email:         String 
  name:          String
  lastname?:      String
  extename?:     String
  emailVerified?: string
  password:      String
  image?:        String
  userRole?:       String
}
export interface data {
	products: product[];
	users:user[]
}
