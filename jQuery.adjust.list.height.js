var AdjustList = AdjustList || {};
AdjustList.list_height = {
//automatic edjast the hieght of all the items in the list to the heighest one.
    list_path: null,
    offset:0,
    postset:0,
    init: function(list_path,offset){
        this.list_path = list_path;
        this.offset = offset;
        this.check();
    },
    check: function(){
        if(this.list_path === undefined || this.list_path == '')
            this.list_path = '.posts-list';
        //incase of first item exceptio0nal
        if(this.offset === undefined)
            this.offset = 0;
       //adjust only the offset items height  
       clearTimeout(window.adjust_list_height_resizedFinished);
        window.adjust_list_height_resizedFinished = setTimeout(function(){
            AdjustList.list_height.change();
        },300)
        // ON WINDOW RESIZE
        jQuery(window).resize(function() {
            clearTimeout(window.adjust_list_height_resizedFinished);
            //call function when window resize complete
            window.adjust_list_height_resizedFinished = setTimeout(function(){
                 AdjustList.list_height.change();
            }, 250);
        });

    },
    change: function(){
        jQuery(this.list_path).find('.item').height('inherit');
        if(jQuery(window).width() <= 480){
            return;
        }

        if(this.offset > 0 ){
            this.postset = 0-(jQuery(this.list_path).find('.item').length - this.offset);
            var max_height = this.max_height(jQuery(this.list_path + ' .item'),0);
            jQuery(this.list_path).find('.item').slice(0, this.postset ).height(max_height);

        }
        //adjust all items height exclude offset items
       var max_height = this.max_height(jQuery(this.list_path + ' .item'));
       jQuery(this.list_path).find('.item').slice( this.offset ).height(max_height);
    },
    max_height: function(list_path){
        var max = -1;
        jQuery(list_path).each(function(i) {
            if(i < this.offset || (this.postset !== undefined && i > -this.postset)){
                return;
            }
            var h = jQuery(this).height(); 
            max = h > max ? h : max;
        });
        return max;
    }
}
