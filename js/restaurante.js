//Redondeando el precio a mostrar a dos cifras decimales
function formatDecimal(val, n) {
    n = n || 2;
    var str = "" + Math.round(parseFloat(val) * Math.pow(10, n));
    while (str.length <= n) {
        str = "0" + str;
    }
    var pt = str.length - n;
    return str.slice(0, pt) + "." + str.slice(pt);
}
function getRadioVal(form, name) {
    var radios = form.elements[name];
    var val;
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked == true) {
            val = radios[i].value;
            break;
        }
    }
    return val;
}


//Calcula el subtotal de ingredientes seleccionados
function getProductosTotal(e) {
    var form = this.form;
    var val = parseFloat(form.elements['acomp_total'].value);
    if (this.checked == true) {
        val += parseFloat(this.value);
    } else {
        val -= parseFloat(this.value);
    }

    form.elements['acomp_total'].value = formatDecimal(val);
    updateComboTotal(form);
}

//Obtiene el subtotal del valor de la pizza de acuerdo al tamaño
function getComboPrice(e) {
    this.form.elements['combo_total'].value = parseFloat(this.value);
    updateComboTotal(this.form);
}

//Calcula el precio total a cancelar por la pizza tomando en cuenta
//los subtotales de acuerdo al tamaño y a los ingredientes seleccionados
function updateComboTotal(form) {
    var combo_total = parseFloat(form.elements['combo_total'].value);
    var acomp_total = parseFloat(form.elements['acomp_total'].value);
    form.elements['total'].value = formatDecimal(combo_total + acomp_total);
   }
   (function() {
    var form = document.getElementById('menuform');
    var el = document.getElementById('Productos');
    // Determinar los ingredientes seleccionados en las casillas de verificación
    var tops = el.getElementsByTagName('input');
    for (var i=0, len=tops.length; i<len; i++) {
    if (tops[i].type === 'checkbox') {
    tops[i].onclick = getProductosTotal;
    }
    }
    var sz = form.elements['combo' ];
    for (var i=0, len=sz.length; i<len; i++) {
    sz[i].onclick = getComboPrice;
    }
   
    // set combo_total to value of selected
    form.elements['combo_total'].value = formatDecimal(parseFloat(getRadioVal(form, 'combo')));
    updateComboTotal(form);
   })();