(function () {
    $('.order-option-wrapper a').on('click', function (e) {

        var $this = $(this),
            webtrendsFunctionToCall = $this.data('webtrendsCall') || '',
            archiveName = $this.data('archiveLink') || false;

        webTrendsProxy(webtrendsFunctionToCall);

    });

    function webTrendsProxy(arg, archiveLink) {
        switch (arg) {
            case 'downloadFullRecord':
                dcsMultiTrack('DCS.dcsuri', '/conversion/download/', 'WT.ti', 'Conversion:download', 'WT.cg_n', 'Conversion', 'WT.cg_s', 'download record', 'WT.dl', '0', 'WT.pn_sku', ' ', 'WT.pn_sc', ' ', ' WT.pn_gr', ' ', ' WT.pn_fa', ' ', ' WT.si_n', 'ShoppingCart', ' WT.si_p', 'DownloadDocument', 'WT.tx_e', ' ');
                break;
            case 'imageViewer':
                dcsMultiTrack('DCS.dcsuri', '/conversion/image-viewer/', 'WT.ti', 'Conversion - Image viewer', 'WT.cg_n', 'Conversion', 'WT.cg_s', 'image viewer', 'WT.dl', '0', 'WT.si_n', 'ShoppingCart', 'WT.si_p', 'ImageViewer');
                break;
            case 'addToBasket':
                dcsMultiTrack('DCS.dcsuri','/conversion/add-to-basket/', 'WT.ti', 'Conversion - add to basket', 'WT.cg_n', 'Conversion','WT.cg_s','add to basket', 'WT.dl','0','WT.pn_sku',' ','WT.pn_sc',' ',' WT.pn_gr',' ',' WT.pn_fa',' ',' WT.si_n','ShoppingCart',' WT.si_p','AddToBasket', 'WT.tx_e',' ');
                break;
            case 'orderNow':
                dcsMultiTrack('DCS.dcsuri', '/conversion/order-now/', 'WT.ti', 'Conversion - Order now', 'WT.cg_n', 'Conversion', 'WT.cg_s', 'Order now', 'WT.dl', '0');
                break;
            case 'foi':
                dcsMultiTrack('DCS.dcsuri', '/conversion/order-now/', 'WT.ti', 'Conversion - Order now', 'WT.cg_n', 'Conversion', 'WT.cg_s', 'Order now', 'WT.dl', '0');
                break;
            case 'lia':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/External/LIA', 'WT.ti', 'Conversion: LIA', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.prodpgtype', '', 'DCSext.prodpgaction', 'conversion', 'DCSext.ref', '');
                break;
            case 'onsiteInfo':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/OnsiteInfo', 'WT.ti', 'Conversion: OnsiteInfo', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.prodpgtype', '', 'DCSext.prodpgaction', 'conversion', 'DCSext.ref', '');
                break;
            case 'webArchive':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/External/WebArchive', 'WT.ti', 'Conversion: WebArchive', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.prodpgtype', '', 'DCSext.prodpgaction', 'conversion', 'DCSext.ref', '');
                break;
            case 'advancedOrder':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/Order/AdvancedOrder', 'WT.ti', 'Conversion: AdvancedOrder ', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.prodpgtype', '', 'DCSext.prodpgaction', 'conversion', 'DCSext.ref', '');
                break;
            case 'recordCopying':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/Order/OrderCopies', 'WT.ti', 'Conversion: OrderCopies ', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.prodpgtype', '', 'DCSext.prodpgaction', 'conversion', 'DCSext.ref', '');
                break;
            case 'unavailable':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/Unavailable', 'WT.ti', 'Conversion: Unavailable', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.ref', '');
                break;
            case 'paidSearch':
                dcsMultiTrack('DCS.dcsuri', '/Conversion/PaidSearch', 'WT.ti', 'Conversion: PaidSearch', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.ref', '');
                break;
            case 'archiveLink':
                if (archiveName) {
                    dcsMultiTrack('DCS.dcsuri', '/Conversion/OtherArchive', 'WT.ti', 'Conversion: OtherArchive', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.ref', '', 'DCSext.pageType', archiveName);
                } else {
                    dcsMultiTrack('DCS.dcsuri', '/Conversion/OtherArchive', 'WT.ti', 'Conversion: OtherArchive', 'WT.cg_n', 'Conversion', 'WT.dl', '0', 'DCSext.ref', '', 'DCSext.pageType', 'Archive name not known');
                }
                break;
        }
    }
}())
