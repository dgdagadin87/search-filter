import './cssEntry/cssEntry';

class ExtendedFilter {

    constructor(props) {

        const {sortBy} = props;

        this._sortBy = sortBy;

        this._fieldNames = {
            platform: 'Спутник',
            cloudness: 'Обл.',
            tilt: 'Угол',
            acqdate: 'Дата'
        };

        this.state = this._setState();
    }

    apply() {

        this._applyExtendedHeaders();
    }

    _setState() {

        
    }

    _applyExtendedHeaders() {

        this._applyExtenderHeader('platform');
        this._applyExtenderHeader('cloudness');
        this._applyExtenderHeader('tilt');
        this._applyExtenderHeader('acqdate');
    }

    _applyExtenderHeader(headerName) {

        this._setHtmlContent(headerName);
        this._addEventListeners(headerName);
    }

    _setHtmlContent(headerName) {

        const headerElement = document.querySelector('#results-header-' + headerName);
        
        headerElement.innerHTML = (
            `<span class="filterable-header">${this._fieldNames[headerName]}</span>
            <i class="table-list-sort"></i>`
        );
    }

    _addEventListeners(headerName) {

        const headerElement = document.querySelector('#results-header-' + headerName + ' > span');
        const sortElement = document.querySelector('#results-header-' + headerName + ' > i');

        headerElement.addEventListener('mouseover', this._onMouseOver.bind(this, headerName));
        headerElement.addEventListener('mouseout', this._onMouseOut.bind(this));
        sortElement.addEventListener('mouseover', this._onMouseOver.bind(this, headerName));
        sortElement.addEventListener('mouseout', this._onMouseOut.bind(this));

        headerElement.addEventListener('click', this._onClick.bind(this, headerName));
    }

    _onMouseOver(headerName, e) {

        const {field, asc} = this._sortBy;

        const {target} = e;
        const parentNode = target.parentNode;
        const tableSort = parentNode.querySelector('.table-list-sort');

        if (tableSort && field === headerName) {

            const sortIndicator = `table-list-sort-${asc ? 'up' : 'down'}`;

            tableSort.classList.add(sortIndicator);
        }
    }

    _onMouseOut(e) {

        const {target} = e;
        const parentNode = target.parentNode;
        const tableSort = parentNode.querySelector('.table-list-sort');

        if (tableSort) {
            ['up', 'down'].forEach(item => {
                tableSort.classList.remove(`table-list-sort-${item}`);
            });
        }
    }

    _onClick(headerName, e) {

        const {target} = e;
        
        if (target) {
            target.classList.add('active');
        }
    }

}

const filterPlugin = new ExtendedFilter({
    sortBy: {field: 'platform', asc: false}
});
filterPlugin.apply();