import './cssEntry/cssEntry';

import './satellites/Satellites';
import { satellites } from './satellites/Satellites';

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

        this._setSatellites();

        this.state = this._setState();
    }

    apply() {

        this._applyExtendedHeaders();
    }

    _setSatellites() {

        this._satellites = [];

        satellites.ms.forEach(item => {
            this._satellites.push(item);
        });
        satellites.pc.forEach(item => {
            this._satellites.push(item);
        });
    }

    _setState() {

        
    }

    _getSatelliteList(cache) {
        return cache.map((x) => {
            const {id, name,} = x;
            return `<div class="satellite-col">
                        <input type="checkbox" id="sat_${id}" value="${id}" />
                        <label for="sat_${id}">${name}</label>
                    </div>`;
        }).join('');
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
        this._addSpecificEventListeners(headerName);
    }

    _setHtmlContent(headerName) {

        const headerElement = document.querySelector('#results-header-' + headerName);
        
        let innerContent = '';

        if (headerName === 'platform') {

            innerContent = `
            <div style="display: none;" class="togglable-content filterable-satellites-container">
                <fieldset class="search-options-satellites-ms">
                    ${this._getSatelliteList(this._satellites)}
                </fieldset>
                <div class="apply ">Применить</div>
            </div>`;
        }

        let headerContent = (
            `<div class="filterable-field-container">
                <span class="filterable-header">${this._fieldNames[headerName]}</span>
                <i class="table-list-sort"></i>
                ${innerContent}
            </div>`
        );

        

        headerElement.innerHTML = headerContent;
    }

    _addEventListeners(headerName) {

        const headerElement = document.querySelector('#results-header-' + headerName + ' span');
        const sortElement = document.querySelector('#results-header-' + headerName + ' i');

        headerElement.addEventListener('mouseover', this._onMouseOver.bind(this, headerName));
        headerElement.addEventListener('mouseout', this._onMouseOut.bind(this));
        sortElement.addEventListener('mouseover', this._onMouseOver.bind(this, headerName));
        sortElement.addEventListener('mouseout', this._onMouseOut.bind(this));

        headerElement.addEventListener('click', this._onClick.bind(this, headerName));
    }

    _addSpecificEventListeners(headerName) {

        if (headerName === 'platform') {
            const applyButton = document.querySelector('#results-header-platform .apply');

            applyButton.addEventListener('click', this._onApplyClick.bind(this));
        }
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

        const hasActiveClass = target.classList.contains('active');
        const parentNode = target.parentNode;
        const filterContainer = parentNode.querySelector('.togglable-content');

        if (!hasActiveClass) {
            target.classList.add('active');
            filterContainer.style.display = 'block';
        }
        else {
            target.classList.remove('active');
            filterContainer.style.display = 'none';
        }
    }

    _onApplyClick(e) {

        const togglableContainer = document.querySelector('#results-header-platform .togglable-content');

        togglableContainer.style.display = 'none';
    }

}

const filterPlugin = new ExtendedFilter({
    sortBy: {field: 'platform', asc: false}
});
filterPlugin.apply();