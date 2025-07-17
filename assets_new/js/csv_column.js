function item_csv(value,cat_Type,shpo_url) {
	var l = 8;
	var c = "abcdefghijklmnopqrstuvwxyz0123456789";
	
	var cl = c.length;
	var num = "";
	for(var i=0; i<l; i++){
		num += c[Math.floor(Math.random()*cl)];
	}
	$.ajax({
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=shift_jis");
		},
		url : value +'.csv?'+num,
		dataType : 'text'
	}).done(function(text) {
		var csv = $.csv()(text);
		var TYPE;
		var ITEM_HTML;
		
		var imageURL;
		var catchcopy;
		var catchcopyHTML;
		var itemName;
		var originalPrice;
		var salePrice;
		var url;
		var reco;
		var icon_shipping;
		var shippingHTML;
		var icon_off_01;
		var icon_off_02;
		var offHTML_01;
		var offHTML_02;
		var couponPrice;
		var couponPriceHTML;

		var coupon_01;
		var coupon_01_URL;
		var coupon_02;
		var coupon_02_URL;
		var couponHTML;
		var couponHTML_in_02;

		var reco;
		var priceFlag;
		var priceLength;
		var column = 'column_2 '
    var columnItem;

		var shopID = '10046611';

		var ContentsNum = new Object();
		$.each(cat_Type, function (index, elem) {
			ContentsNum[elem] = 1;
		}); 

		function ITEM(TYPE) {
			ITEM_HTML = '<article class="'+ column + priceFlag + priceLength +'">\n' +
				'  <dl>\n' +
				'    <dt>'+catchcopyHTML+'<span class="image_box"><img src="' + imageURL + '"></span>' + offHTML_02 + '</dt>\n' +
				'    <dd class="description">\n' +
				'      <p class="name">' + shippingHTML +'</p>\n' +
				'      <div class="price">\n' +
				'        <span class="normalPrice"><span class="txt">通常価格</span><b>' + originalPrice + '</b><small>円が</small></span>\n' +
				'        <span class="salePrice">' + offHTML_01 + salePrice + '<small>円<span class="tax">(税込)</span></small></span>\n' +
				'      </div>\n' +couponHTML+
				'      <div class="btn">\n' +
				'        <span class="RecoBtn"><a href="'+ reco +'" target="_blank">お気に入り</a></span>\n' +
				'        <span class="buyBtn"><a href="' + url + '"><span>購入する</span></a></span>\n' +
				'      </div>\n' +
				'    </dd>\n' +
				'    <dd class="link"><a href="' + url + '">more</a></dd>\n' +
				'  </dl>\n' +
				'</article>\n';
				ContentsNum[TYPE] ++;
		}

		$(csv).each(function (index) {
			if (index !== 0) {
				
				TYPE = this[0];
				itemName = this[2];
				catchcopy = this[3];
				originalPrice = this[4];
				salePrice = this[5];
				couponPrice = this[6];
				icon_off_01 = this[7];
				icon_shipping = this[8];
				url = this[10];
				imageURL = this[11];
				reco = this[12];
        columnItem = this[17];

				coupon_01 = this[13];
				coupon_01_URL = this[14];
				coupon_02 = this[15];
				coupon_02_URL = this[16];

				catchcopyHTML = '';
				if( catchcopy ){
					catchcopyHTML = '<span class="catchcopy">' + catchcopy + '</span>';
				}
				offHTML_01 = '';
				if( icon_off_01 ){
					offHTML_01 = '<span class="off_parts"><img src="assets_new/images/icon3/'+ icon_off_01 +'"></span>';
				}
				shippingHTML = '';
				if( icon_shipping ){
					shippingHTML = '<span class="shipping"><img src="assets_new/images/icon2/icon_free_shipping.gif"></span>';
				}

				if( TYPE === '\nTIMESALE' ){
					catchcopyHTML = '<span class="catchcopy red"><img src="assets_new/images/icon/text_timesale.png"></span>';
				}
				couponHTML = '';
				couponHTML_in_02 = '';
				offHTML_02 = '';
				if( TYPE === '\nCOUPON' ){
					/*if( icon_off_01 ){
						offHTML_02 = '<span class="off_parts"><img src="assets_new/images/icon/'+ icon_off_01 +'"></span>';
						offHTML_01 = '';
					}*/
					if( coupon_01 ){
						if( coupon_02 ){
							couponHTML_in_02 = '<div class="itemCoupon"><a href="'+coupon_02_URL+'" target="_blank"><img src="assets_new/images/icon/'+ coupon_02 +'"></a></div>'
						}
						couponHTML = '<div class="couponPrice">' +
									  '  <div class="itemCoupon"><a href="'+coupon_01_URL+'" target="_blank"><img src="assets_new/images/icon/'+ coupon_01 +'"></a></div>'+couponHTML_in_02+
									  '</div>';
					}
				}else if( TYPE === '\nPRICE_DOWN' ){
					/*if( icon_off_01 ){
						offHTML_02 = '<span class="off_parts"><img src="assets_new/images/icon/'+ icon_off_01 +'"></span>';
						offHTML_01 = '';
					}*/
				}
				if ( String(salePrice).match(/,/) ) {
					salePrice = salePrice.replace(/,/g, '');
				}
				if ( String(originalPrice).match(/,/) ) {
					originalPrice = originalPrice.replace(/,/g, '');
				}
				if( String(salePrice).length >= 5){
					priceLength = ' long_price';
				}else{
					priceLength ='';
				}
				originalPrice = String(originalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
				salePrice = String(salePrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

				//HTML output
				$.each(cat_Type,function(index,elem){
					if( TYPE === '\n'+elem){
						if(originalPrice === salePrice || !originalPrice){
							priceFlag = 'no';
						}else{
							priceFlag = 'on';
						}
						if( 
							TYPE === '\nTIMESALE01' ||
							TYPE === '\nTIMESALE02' ||
							TYPE === '\nFEATURE' ||
							//TYPE === '\nCOUPON' ||
							//TYPE === '\nROOME_WEAR' && ContentsNum[elem] <= 1 ||
							//TYPE === '\nPRICE_DOWN' && ContentsNum[elem] <= 2 ||
							//TYPE === '\nNIGHT_BRA' && ContentsNum[elem] <= 1 ||*/
							TYPE === '\nRANKING' && ContentsNum[elem] <= 1 ||
							//TYPE === '\nNEW_ITEM' && ContentsNum[elem] <= 1
							TYPE === '\nNEW_ITEM'
						){
              if(columnItem === '2'){
                column = 'column_2 ';
              }else{
                column = 'column_1 ';
              }
						}else{
              if(columnItem === '1'){
                column = 'column_1 ';
              }else{
                column = 'column_2 ';
              }
						}
						ITEM(elem);
						$('#'+elem+' .default_item_list').append(ITEM_HTML);
						return false;
					 }
				 });
			}
		});
	});
}
