//=============================================================================
// Lanza_WeatherAdvance.js
// by Lanza
// Last Updated: 2015.12.27
//=============================================================================
var Lanza = Lanza || {};
Lanza.WeatherAdvance = Lanza.WeatherAdvance || {};
Lanza.rand = function(max){
	return Math.floor(Math.random()*(max + 1));
}
/*:
 * @plugindesc �˲����ֲ��һ����վ��������ǿ�ű�(������˾�����Դ�ˡ���), ��֮���Ǻ�ʵ�õġ�
 * @author Lanza
 *
 * @help
 *
 * �������:
 *	Set_Weather type, power, duration, wait	# �趨����: ������(�±�), ǿ��(1 ~ 9), ����ʱ��(1 / 60 sec), �Ƿ�ȴ�(true, false)
 *	������:
 *	hail 		- 		����
 *	petal		-		ӣ����
 *	bloodrain	-		Ѫ��
 *	ash			-		����
 *	bubble		-		����
 *
 */
//=============================================================================
// Game_Interpreter
//=============================================================================
Lanza.WeatherAdvance.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Lanza.WeatherAdvance.Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === 'Set_Weather'){
		args[1] = parseInt(args[1]);
		args[2] = parseInt(args[2]);
		if (!$gameParty.inBattle()) {
			$gameScreen.changeWeather(args[0], args[1], args[2]);
			if (args[3] == 'true') {
				this.wait(args[2]);
			}
		}
		return true;
	}
};

//=============================================================================
// Weather
//=============================================================================
Lanza.WeatherAdvance.Weather_createBitmaps = Weather.prototype._createBitmaps;
Weather.prototype._createBitmaps = function() {
	// ��ɫ
	var blueGrey 	= Utils.rgbToCssColor(215, 227, 227);
	var grey 		= Utils.rgbToCssColor(214, 217, 217);
	var aqua		= Utils.rgbToCssColor(197, 253, 254);
	var lavender	= Utils.rgbToCssColor(225, 190, 244);
	var lightGrey 	= Utils.rgbToCssColor(233, 233, 233);
	var lightBlue 	= Utils.rgbToCssColor(222, 239, 243);
	var lightPink 	= Utils.rgbToCssColor(255, 167, 192);
	var darkRed 	= Utils.rgbToCssColor(141, 9, 9);
	var darkBlue	= Utils.rgbToCssColor(77, 136, 225);
	var darkPink 	= Utils.rgbToCssColor(213, 106, 136);
	// ����
    this._hail_bitmap = new Bitmap(4, 4);
	this._hail_bitmap.fillRect(1, 0, 2, 1, blueGrey);
	this._hail_bitmap.fillRect(0, 1, 1, 2, blueGrey);
	this._hail_bitmap.fillRect(3, 1, 1, 2, grey);
	this._hail_bitmap.fillRect(1, 3, 2, 1, grey);
	this._hail_bitmap.fillRect(1, 1, 2, 2, lightGrey);
	this._hail_bitmap.fillRect(1, 1, 1, 1, lightBlue);
	// ӣ��
	this._petal_bitmap = new Bitmap(4, 4);
	this._petal_bitmap.fillRect(0, 3, 1, 1, lightPink);
	this._petal_bitmap.fillRect(1, 2, 1, 1, lightPink);
	this._petal_bitmap.fillRect(2, 1, 1, 1, lightPink);
	this._petal_bitmap.fillRect(3, 0, 1, 1, lightPink);
	this._petal_bitmap.fillRect(1, 3, 1, 1, darkPink);
	this._petal_bitmap.fillRect(2, 2, 1, 1, darkPink);
	this._petal_bitmap.fillRect(3, 1, 1, 1, darkPink);
	// Ѫ��
	this._bloodrain_bitmap = new Bitmap(7, 56);
	for(var i = 0;i < 6;i++){
		this._bloodrain_bitmap.fillRect(6 - i, i * 8, 1, 8, darkRed);
	}
	this._bloodrain_splash_bitmap = new Bitmap(8, 5);
	this._bloodrain_splash_bitmap.fillRect(1, 0, 6, 1, darkRed);
	this._bloodrain_splash_bitmap.fillRect(1, 4, 6, 1, darkRed);
	this._bloodrain_splash_bitmap.fillRect(0, 1, 1, 3, darkRed);
	this._bloodrain_splash_bitmap.fillRect(7, 1, 1, 3, darkRed);
	// ����
	this._ash_bitmap = new Bitmap(3, 3);
	this._ash_bitmap.fillRect(0, 1, 1, 3, lightGrey);
	this._ash_bitmap.fillRect(1, 0, 3, 1, lightGrey);
	this._ash_bitmap.fillRect(1, 1, 1, 1, 'white');
	// ����
	this._bubble_bitmap = new Bitmap(24, 24);
	this._bubble_bitmap.fillRect(0, 9, 24, 5, darkBlue);
	this._bubble_bitmap.fillRect(1, 6, 22, 11, darkBlue);
	this._bubble_bitmap.fillRect(2, 5, 20, 13, darkBlue);
	this._bubble_bitmap.fillRect(3, 4, 18, 15, darkBlue);
	this._bubble_bitmap.fillRect(4, 3, 16, 17, darkBlue);
	this._bubble_bitmap.fillRect(5, 2, 14, 19, darkBlue);
	this._bubble_bitmap.fillRect(6, 1, 12, 21, darkBlue);
	this._bubble_bitmap.fillRect(9, 0, 5, 24, darkBlue);
	this._bubble_bitmap.fillRect(2, 11, 20, 4, aqua);
	this._bubble_bitmap.fillRect(3, 7, 18, 10, aqua);
	this._bubble_bitmap.fillRect(4, 6, 16, 12, aqua);
	this._bubble_bitmap.fillRect(5, 5, 14, 14, aqua);
	this._bubble_bitmap.fillRect(6, 4, 12, 16, aqua);
	this._bubble_bitmap.fillRect(9, 2, 4, 20, aqua);
	this._bubble_bitmap.fillRect(5, 10, 1, 7, lavender);
	this._bubble_bitmap.fillRect(6, 14, 1, 5, lavender);
	this._bubble_bitmap.fillRect(7, 15, 1, 4, lavender);
	this._bubble_bitmap.fillRect(8, 16, 1, 4, lavender);
	this._bubble_bitmap.fillRect(9, 17, 1, 3, lavender);
	this._bubble_bitmap.fillRect(10, 18, 4, 3, lavender);
	this._bubble_bitmap.fillRect(14, 18, 1, 2, lavender);
	this._bubble_bitmap.fillRect(13, 5, 4, 4, 'white');
	this._bubble_bitmap.fillRect(14, 4, 2, 1, 'white');
	this._bubble_bitmap.fillRect(17, 6, 1, 1, 'white');
	// 
	// ԭ��ͼ��
	Lanza.WeatherAdvance.Weather_createBitmaps.call(this);
};

Lanza.WeatherAdvance.Weather_updateSprite = Weather.prototype._updateSprite;
Weather.prototype._updateSprite = function(sprite) {
	switch (this.type) {
    case 'hail':
        this._updateHailSprite(sprite);
        break;
    case 'petal':
        this._updatePetalSprite(sprite);
        break;
	case 'bloodrain':
        this._updateBloodrainSprite(sprite);
        break;
	case 'ash':
        this._updateAshSprite(sprite);
        break;
	case 'bubble':
        this._updateBubbleSprite(sprite);
        break;
    }
	Lanza.WeatherAdvance.Weather_updateSprite.call(this, sprite);
};

Weather.prototype._updateHailSprite = function(sprite) {
    sprite.bitmap = this._hail_bitmap;
    sprite.ax -= 1;
    sprite.ay += 18;
    sprite.opacity -= 15;
};

Weather.prototype._updatePetalSprite = function(sprite) {
    sprite.bitmap = this._petal_bitmap;
    sprite.ax -= 1;
    sprite.ay += 1;
	sprite.opacity -= 4;
};

Weather.prototype._updateBloodrainSprite = function(sprite) {
	if(sprite.opacity <= 150){
		sprite.ay += this._bloodrain_bitmap.height;
		sprite.ax -= this._bloodrain_bitmap.width;
		sprite.bitmap = this._bloodrain_splash_bitmap;
	}
	else{
		sprite.bitmap = this._bloodrain_bitmap;
		sprite.ax -= 2;
		sprite.ay += 12;
	}
	sprite.opacity -= 4;
};
Weather.prototype._updateAshSprite = function(sprite) {
	var swc = Lanza.rand(75) + Lanza.rand(75) + 1
    sprite.bitmap = this._ash_bitmap;
	switch(swc % 3){
		case 0:
			sprite.ax -= 1;
			break;
		case 1:
			sprite.ax += 1;
			break;
	}
    sprite.ay += 2;
	sprite.opacity -= 3;
};
Weather.prototype._updateBubbleSprite = function(sprite) {
	var swc = Lanza.rand(75) + Lanza.rand(75) + 1
    sprite.bitmap = this._bubble_bitmap;
	if(75 < swc){
		sprite.ax -= 1;
	}
	else{
		sprite.ax += 1;
	}
    sprite.ay -= 1;
	if(swc % 2 == 0)sprite.opacity -= 1;
};



























