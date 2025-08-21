const alertZonesPlugin = {
    id: 'alertZones',
    beforeDraw: (chart) => {
        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
        ctx.save();
        
        const alertRules = chart.options.plugins.alertZones?.alertRules;
        if (!alertRules) return;

        const upper_red_start_threshold = alertRules.maxTime + (alertRules.maxAlertCoefficient / 100) * (alertRules.maxGridValue - alertRules.maxTime);
        const lower_red_end_threshold = (alertRules.minAlertCoefficient / 100) * alertRules.minTime;
        
        const redTopYStart = y.getPixelForValue(upper_red_start_threshold);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)'; // Morado oscuro
        ctx.fillRect(left, top, width, redTopYStart - top);

        const yellowTopYStart = y.getPixelForValue(alertRules.maxTime);
        ctx.fillStyle = 'rgba(196, 181, 253, 0.2)'; // Morado claro
        ctx.fillRect(left, redTopYStart, width, yellowTopYStart - redTopYStart);

        const yellowBottomYEnd = y.getPixelForValue(alertRules.minTime);
        const yellowBottomYStart = y.getPixelForValue(lower_red_end_threshold);
        ctx.fillStyle = 'rgba(196, 181, 253, 0.2)'; // Morado claro
        ctx.fillRect(left, yellowBottomYStart, width, yellowBottomYEnd - yellowBottomYStart);

        const redBottomYEnd = y.getPixelForValue(lower_red_end_threshold);
        const redBottomYStart = y.getPixelForValue(alertRules.minGridValue);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)'; // Morado oscuro
        ctx.fillRect(left, redBottomYStart, width, redBottomYEnd - redBottomYStart);
        
        ctx.restore();
    }
};
export default alertZonesPlugin;