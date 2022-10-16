var grUser = new GlideRecord('sys_user');
grUser.addEncodedQuery('query');
grUser.query();


while(grUser.next()) {
    grUser.setValue('active', false);
    grUser.update();
}