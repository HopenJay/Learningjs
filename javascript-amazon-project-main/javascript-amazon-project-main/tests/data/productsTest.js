import {Appliance, Clothing, Product} from '../../data/products.js'

describe('test suite: Product', () => {
    let pro;

    beforeEach(() => {
        pro = new Product({
            id: 'sdjbuisjkidbsdkjn',
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: 'socks',
            rating: {
                stars: 5.0,
                count: 90
            },
            priceCents: 1090,
        });
    });

    it('has the correct properties', () => {
        //Note: I don't have to test all the properties.
        //I can just pick a few to test.
        expect(pro.id).toEqual('sdjbuisjkidbsdkjn');
        expect(pro.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(pro.name).toEqual('socks');
        expect(pro.rating).toEqual( {
                stars: 5.0,
                count: 90
            }
        );
        expect(pro.priceCents).toEqual(1090);
    });

    it('gets the stars url', () => {
        expect(pro.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    });

    it('gets the price', () => {
        expect(pro.getPrice()).toEqual('$10.90');
    });

    it('does not display any extra info', () => {
        expect(pro.extraInfoHTML()).toEqual('')
    });
});

describe('test suite: Clothing', () => {
    let clothing;

    beforeEach(() => {
        clothing = new Clothing({
            id: 'jksdbisdjkkdsbsdbuids',
            image: 'ksdnknfsn.png',
            name: 'Cotton t-shirt',
            rating: {
                stars: 4.0,
                count: 67
            },
            priceCents: 799,
            type: 'clothing',
            sizeChartLink: 'images/clthing.pjk'
        });
    });

    it('has the correct properties', () => {
        // Check if inheritance worked correctly
        expect(clothing.id).toEqual('jksdbisdjkkdsbsdbuids');
        expect(clothing.image).toEqual('ksdnknfsn.png');
        expect(clothing.name).toEqual('Cotton t-shirt');
        expect(clothing.rating).toEqual({
                stars: 4.0,
                count: 67
            }
        );
        expect(clothing.priceCents).toEqual(799);
        expect(clothing.sizeChartLink).toEqual('images/clthing.pjk');
    });

    it('gets the stars url', () => {
        expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-40.png');
    });

    it('gets the price', () => {
        expect(clothing.getPrice()).toEqual('$7.99');
    });

    it('displays a size chart link in extraInfoHTML', () => {
        //It's hard to match a multiline string exactly, so we'll just check if the result contains certain strings.
        expect(clothing.extraInfoHTML()).toContain(
            `<a href = "images/clthing.pjk" target = "_blank">`
        );

        // Check the text of the link is correct.
        expect(clothing.extraInfoHTML()).toContain('Size chart');
    });
});

describe('test suite: Appliance', () => {
    let appliance;
    
    beforeEach(() => {
        appliance = new Appliance({
            id: '1800-block',
            image: 'KTB.jpg',
            name: 'Kodak black',
            rating: {
                stars: 5,
                count: 1800
            },
            priceCents: 1800,
            type: 'appliance',
            instructionsLink: 'images/app.png',
            warrantyLink: 'images/app-warr.png'
        });
    });

    it('has the correct properties', () => {
        expect(appliance.id).toEqual('1800-block');
        expect(appliance.image).toEqual('KTB.jpg');
        expect(appliance.instructionsLink).toEqual('images/app.png');
        expect(appliance.warrantyLink).toEqual('images/app-warr.png');
    });

    it('gets the stars url', () => {
        expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    });

    it('gets the price', () => {
        expect(appliance.getPrice()).toEqual('$18.00');
    });

    it('displays instructions and warranty in extraInfoHTML', () => {
        expect(appliance.extraInfoHTML()).toContain(
            `<a href = "images/app.png" target = "_blank">`
        );
        expect(appliance.extraInfoHTML()).toContain('Instructions');

        expect(appliance.extraInfoHTML()).toContain(`<a href = "images/app-warr.png" target = "_blank"`
        );
        expect(appliance.extraInfoHTML()).toContain('Warranty');
    })
})