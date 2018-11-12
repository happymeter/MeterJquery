(function($) {
    $.lightTreeview = {
        toggle: function(o, a) {
            exec(o, a, 'toggle')
        },
        close: function(o, a) {
            exec(o, a, 'hide')
        },
        open: function(o, a) {
            exec(o, a, 'show')
        }
    };
    function exec(o, s, a) {
        var f = $(o).parent();
        var b = f.find('>.flex-ico');
        flex(b, f, {
            animate: isNaN(s) ? 100 : s
        },
        a)
    }
    $.fn.lightTreeview = function(b) {
        if (typeof(b) == 'undefined') b = {};
        var c = i();
        $.extend(c, b);
        this.addClass('lightTreeview');
        if (!c.line) this.addClass('treeview-noline');
        if (c.style) this.addClass('treeview-' + c.style);
        var d = $('li:has(ul,ol)', this);
        $('li:last-child', this).addClass('branch-last');
        if (c.collapse) {
            d.addClass('node-normal').filter(':last-child').attr('class', 'node-last');
            if (c.fileico) $('li:not(:has(ul,ol))>:first-child', this).addClass('treeview-file');
            if (c.folderico) $('>:first-child', d).addClass('treeview-folder');
            d.css('cursor', 'pointer').prepend('<span class="flex-ico"></span>').find('>ul,>ol').filter(':hidden').parent().find('>.flex-ico').addClass('flex-close');
            $('>.flex-ico', d.filter(':last-child')).addClass('flex-none');
            $('>ul,>ol', d.filter(':last-child')).filter(':hidden').parent().addClass('node-last-close');
            d.find('>ul,>ol').filter(':hidden').parent().find('>.treeview-folder').addClass('treeview-folder-close');
            if (c.nodeEvent) d.find('>:nth-child(2)').click(function() {
                $(this).parent().find('>.flex-ico').trigger('click')
            });
            $('>.flex-ico', d).click(function() {
                var f = $(this).parent();
                if (c.unique && $('>ul,>ol', f).is(':hidden')) {
                    var a = $('>li:has(ul,ol)', f.parent()).not(f);
                    flex($('>:first-child', a), a, c, 'hide')
                }
                flex($(this), f, c)
            })
        }
    };
    function flex(a, b, c, d) {
        var e = $('>ul,>ol', b);
        var f = a.filter('.flex-none').parent();
        var g = a.not('.flex-none');
        var h = $('>.treeview-folder', b);
        if (d == 'hide') {
            f.addClass('node-last-close');
            g.addClass('flex-close');
            h.addClass('treeview-folder-close');
            e.hide(c.animate)
        } else if (d == 'show') {
            f.removeClass('node-last-close');
            g.removeClass('flex-close');
            h.removeClass('treeview-folder-close');
            e.show(c.animate)
        } else {
            f.toggleClass('node-last-close');
            g.toggleClass('flex-close');
            h.toggleClass('treeview-folder-close');
            e.toggle(c.animate)
        }
    }
    var i = function() {
        return {
            collapse: true,
            line: true,
            animate: 200,
            nodeEvent: true,
            unique: false,
            style: '',
            fileico: false,
            folderico: false
        }
    }
})(jQuery);