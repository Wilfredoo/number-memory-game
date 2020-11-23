const getAttributes = async (level) => {
    let digits;
	let time;
	switch (level) {
		case '1':
			digits = 5;
			time = 3000;
			break;
		case '2':
			digits = 6;
			time = 3000;
			break;
		case '3':
			digits = 7;
			time = 3000;
			break;
		case '4':
			digits = 8;
			time = 3000;
			break;
		case '5':
			digits = 9;
			time = 3000;
			break;
		case '6':
			digits = 10;
			time = 3000;
			break;
		case '7':
			digits = 11;
			time = 3000;
			break;
		case '8':
			digits = 12;
			time = 3000;
			break;
		case '9':
			digits = 13;
			time = 3000;
			break;
		case '10':
			digits = 14;
			time = 3000;
			break;
	}
	return {digits, time};
};

export default getAttributes;
