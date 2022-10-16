// Remove a imagem do item em questão

var gr = new GlideRecord('sc_cat_item');
var sys_id_item = ''
gr.get(sys_id_item);
gr.setValue('picture', '');
gr.update();