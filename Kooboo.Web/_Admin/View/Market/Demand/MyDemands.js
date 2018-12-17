$(function() {
    var viewModel = function() {
        var self = this;

        this.getList = function() {
            Kooboo.Demand.ListByUser().then(function(res) {
                if (res.success) {
                    self.handleData(res.model);
                }
            })
        }

        this.pager = ko.observable();

        this.handleData = function(data) {
            self.pager(data);
            var docs = data.list.map(function(doc) {
                return {
                    id: doc.id,
                    article: {
                        title: doc.title,
                        description: doc.description,
                        url: Kooboo.Route.Get(Kooboo.Route.Demand.DetailPage, {
                            id: doc.id
                        }),
                        class: "title",
                        newWindow: true
                    },
                    budget: {
                        text: doc.symbol + doc.budget,
                        class:'label-sm label-info'
                    },
                    startDate: {
                        text: getDateString(doc.startDate),
                        class: 'label-sm gray'
                    },
                    endDate: {
                        text: getDateString(doc.endDate),
                        class: 'label-sm gray'
                    },
                    proposalCount: {
                        text: doc.proposalCount,
                        class: 'badge-sm badge-info'
                    },
                    
                    createTime: new Date(doc.createTime).toDefaultLangString(),
                }

                function getDateString(str) {
                    var date = new Date(str);
                    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                }
            })

            self.tableData({
                docs: docs,
                columns: [{
                    displayName: Kooboo.text.common.Demand,
                    fieldName: 'article',
                    type: 'article'
                },{
                    displayName: Kooboo.text.market.demand.StartDate,
                    fieldName: 'startDate',
                    showClass: 'table-short',
                    type: 'label'
                }, {
                    displayName: Kooboo.text.market.demand.EndDate,
                    fieldName: 'endDate',
                    showClass: 'table-short',
                    type: 'label'
                }, {
                    displayName: Kooboo.text.common.budget,
                    fieldName: 'budget',
                    showClass: 'table-short',
                    type: 'label'
                }, {
                    displayName: Kooboo.text.market.demand.proposals,
                    fieldName: 'proposalCount',
                    showClass: 'table-short',
                    type: 'badge'
                }, {
                    displayName: Kooboo.text.market.demand.createTime,
                    fieldName: 'createTime',
                    showClass: 'table-short',
                    type: 'text'
                }],
                
                unselectable: true
            })
        }

        this.getList();
    }

    viewModel.prototype = new Kooboo.tableModel(Kooboo.Demand.name);

    var vm = new viewModel();
    ko.applyBindings(vm, document.getElementById('main'))
})