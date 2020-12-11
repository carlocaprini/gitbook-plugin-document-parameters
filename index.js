

function buildParamContent(kwargs, description) {
    var name = kwargs.name;
    var type = kwargs.type || null;  // if null, it can remain hidden
    var nullable = kwargs.nullable || null;  // if null, it can remain hidden; allowed values: true, false, null
    return name + type + description;
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
                    return values.join("");
                });
                return pp;
            }
        },
    },
    hooks: {},
    filters: {}
};
