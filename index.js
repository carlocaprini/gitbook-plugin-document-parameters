function buildParamContent(kwargs, description) {
    var name = kwargs.name;
    var type = kwargs.type || null;  // if null, it can remain hidden
    return name + type + description;
    return '<p>' + name + '<span>' + type + '</span></p><p>' + description + '</p>';
}

module.exports = {

    blocks: {
        parameters: {
            blocks: ['parameters', 'param'],
            process: function(block) {

                var l = [];
                for (var i = 0; i < block.blocks.length; i++) {
                    var b = block.blocks[i];
                    l.push(this.book.renderBlock('markdown', b.body).then(function(parsedBody){
                        return buildParamContent(b.kwargs, parsedBody);
                    }));
                }
                var pp = Promise.all(l).then(function(values) {
                    var ll = '';
                    for (var i = 0; i < values.length; i++) {
                        ll += '<li class="method-list-item">' + values[i] + '</li>';
                    }
                    var result = '<div class="method-list">' +
                        '<h5 class="method-list-title">Parameters</h5>' +
                        '<ul class="method-list-group">' +
                            ll +
                        '</ul>' +
                    '</div>';
                    return result;
                });

                return pp;
            }
        },
    },
    hooks: {},
    filters: {}
};
