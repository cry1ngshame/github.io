// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sparkline charts
    initSparklines();
    
    // Initialize performance trend chart
    initPerformanceTrendChart();
    
    // Set up view control buttons
    setupViewControls();
    
    // Initialize date controls
    initDateGranularity();
    initDatePeriodButtons();
    initDateRangeToggle();
    initDateInputs();
    initComparisonControls();
    initGMBToggle();
    
    // Initialize checkbox dropdowns
    initCheckboxDropdowns();
    
    // Initialize filter buttons
    initFilterButtons();
    
    // Initialize download data buttons
    initDownloadDataButtons();
    
    // Initialize load more buttons
    initLoadMoreButtons();

    // Initialize domain names and row selection
    // initDomainNamesAndRowSelection();

    // Initialize regex filter inputs
    initRegexFilterInputs();

    // Initialize new dropdown filters
    initDropdownFilters();
});

// Initialize new dropdown filters
function initDropdownFilters() {
    const gmbFilter = document.getElementById('gmbFilter');
    const lpmFilter = document.getElementById('lpmFilter');
    const seoFilter = document.getElementById('seoFilter');

    if (gmbFilter) {
        gmbFilter.addEventListener('change', function() {
            console.log('GBP filter selected:', this.value);
            // In a real implementation, this would filter the data
            showNotification('GBP filter set to: ' + this.options[this.selectedIndex].text);
        });
    }

    if (lpmFilter) {
        lpmFilter.addEventListener('change', function() {
            console.log('LPM filter selected:', this.value);
            // In a real implementation, this would filter the data
            showNotification('LPM filter set to: ' + this.options[this.selectedIndex].text);
        });
    }

    if (seoFilter) {
        seoFilter.addEventListener('change', function() {
            console.log('SEO filter selected:', this.value);
            // In a real implementation, this would filter the data
            showNotification('SEO filter set to: ' + this.options[this.selectedIndex].text);
        });
    }
}

// Function to generate a random dentistry-related domain name
/*
function generateDentalDomain() {
    const prefixes = ['smile', 'bright', 'dental', 'family', 'city', 'perfect', 'healthy'];
    const suffixes = ['care', 'clinic', 'dental', 'dentistry', 'smiles', 'health'];
    const tlds = ['.com', '.ca', '.net', '.org'];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomTld = tlds[Math.floor(Math.random() * tlds.length)];

    return `${randomPrefix}${randomSuffix}${randomTld}`;
}
*/
// Initialize domain names and row selection
/*
function initDomainNamesAndRowSelection() {
    document.querySelectorAll('.data-table tbody').forEach(tbody => {
        tbody.querySelectorAll('tr').forEach(row => {
            const practiceCell = row.querySelector('td:first-child');
            if (practiceCell) {
                const domainName = generateDentalDomain();
                practiceCell.innerHTML = `<a href="#" class="domain-link">${domainName}</a>`;
            }
        });

        tbody.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('domain-link')) {
                event.preventDefault(); // Prevent default link behavior

                const clickedRow = target.closest('tr');
                if (clickedRow) {
                    // Remove 'selected-row' class from all rows in this table
                    tbody.querySelectorAll('tr').forEach(row => {
                        row.classList.remove('selected-row');
                    });

                    // Add 'selected-row' class to the clicked row
                    clickedRow.classList.add('selected-row');

                    // In a real application, you would load data for the selected practice here
                    const domainName = target.textContent.trim();
                    showNotification(`Practice selected: ${domainName}`);
                }
            }
        });
    });
}
*/
// Initialize regex filter inputs
function initRegexFilterInputs() {
    const keywordFilterType = document.querySelector('.keyword-filter-type');
    const keywordInput = document.querySelector('.keyword-input');
    const keywordRegexInputs = document.querySelector('.keyword-regex-inputs');

    const urlFilterType = document.querySelector('.url-filter-type');
    const urlInput = document.querySelector('.url-input');
    const urlRegexInputs = document.querySelector('.url-regex-inputs');

    function toggleRegexInputs(filterTypeSelect, regularInput, regexInputsDiv) {
        if (filterTypeSelect.value === 'include-exclude-regex') {
            regularInput.style.display = 'none';
            regexInputsDiv.style.display = 'flex';
        } else {
            regularInput.style.display = 'block';
            regexInputsDiv.style.display = 'none';
        }
    }

    if (keywordFilterType && keywordInput && keywordRegexInputs) {
        keywordFilterType.addEventListener('change', () => {
            toggleRegexInputs(keywordFilterType, keywordInput, keywordRegexInputs);
        });
        // Initial state
        toggleRegexInputs(keywordFilterType, keywordInput, keywordRegexInputs);
    }

    if (urlFilterType && urlInput && urlRegexInputs) {
        urlFilterType.addEventListener('change', () => {
            toggleRegexInputs(urlFilterType, urlInput, urlRegexInputs);
        });
        // Initial state
        toggleRegexInputs(urlFilterType, urlInput, urlRegexInputs);
    }
}


// Initialize sparkline charts
function initSparklines() {
    const sparklineCharts = document.querySelectorAll('.sparkline-chart');
    
    sparklineCharts.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const values = canvas.getAttribute('data-values').split(',').map(Number);
        const shouldInvert = canvas.getAttribute('data-invert') === 'true';
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(values.length).fill(''),
                datasets: [{
                    data: values,
                    borderColor: shouldInvert ? '#FF3333' : '#00CC66',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        min: shouldInvert ? 
                            Math.min(...values) * 0.9 : 
                            Math.min(...values) * 0.9,
                        max: shouldInvert ? 
                            Math.max(...values) * 1.1 : 
                            Math.max(...values) * 1.1
                    }
                }
            }
        });
    });
}

// Initialize table sorting
function initTableSorting() {
    document.querySelectorAll('.data-table th.sortable-header').forEach(headerCell => {
        headerCell.addEventListener('click', () => {
            const table = headerCell.closest('table');
            const tbody = table.querySelector('tbody');
            const headerIndex = Array.from(headerCell.parentNode.children).indexOf(headerCell);
            const currentIsAsc = headerCell.classList.contains('asc');
            const currentIsDesc = headerCell.classList.contains('desc');

            // Remove sorting classes from all headers in this table
            table.querySelectorAll('th').forEach(th => {
                th.classList.remove('asc', 'desc');
            });

            let newIsAsc;
            if (currentIsAsc) {
                // Was ascending, now descending
                headerCell.classList.add('desc');
                newIsAsc = false;
            } else if (currentIsDesc) {
                // Was descending, now no sort
                // No class added
                newIsAsc = null; // Indicate no sort
            } else {
                // No sort, now ascending
                headerCell.classList.add('asc');
                newIsAsc = true;
            }

            if (newIsAsc !== null) {
                const rows = Array.from(tbody.querySelectorAll('tr'));

                rows.sort((rowA, rowB) => {
                    const cellA = rowA.querySelectorAll('td')[headerIndex].textContent.trim();
                    const cellB = rowB.querySelectorAll('td')[headerIndex].textContent.trim();

                    let comparison = 0;
                    // Determine data type and compare accordingly
                    if (!isNaN(parseFloat(cellA)) && isFinite(cellA) && !isNaN(parseFloat(cellB)) && isFinite(cellB)) {
                        // Numeric comparison
                        comparison = parseFloat(cellA) - parseFloat(cellB);
                    } else if (cellA.endsWith('%') && cellB.endsWith('%')) {
                        // Percentage comparison
                        const percentA = parseFloat(cellA.replace('%', ''));
                        const percentB = parseFloat(cellB.replace('%', ''));
                        comparison = percentA - percentB;
                    }
                     else {
                        // String comparison
                        comparison = cellA.localeCompare(cellB);
                    }


                    return newIsAsc ? comparison : -comparison;
                });

                // Re-append sorted rows
                rows.forEach(row => tbody.appendChild(row));
            } else {
                // If no sort, revert to original order (requires storing original order or re-fetching)
                // For this mockup, we'll just leave it as is or could reload the initial data
                // A real application would likely re-render from the original data source
                console.log("Sorting reset. In a real app, data would revert to original order.");
            }
        });
    });
}

// Initialize row selection
function initRowSelection() {
    document.querySelectorAll('.data-table tbody').forEach(tbody => {
        tbody.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('domain-link')) {
                event.preventDefault(); // Prevent default link behavior

                const clickedRow = target.closest('tr');
                if (clickedRow) {
                    // Remove 'selected-row' class from all rows in this table
                    tbody.querySelectorAll('tr').forEach(row => {
                        row.classList.remove('selected-row');
                    });

                    // Add 'selected-row' class to the clicked row
                    clickedRow.classList.add('selected-row');

                    // In a real application, you would load data for the selected practice here
                    const domainName = target.textContent.trim();
                    showNotification(`Practice selected: ${domainName}`);
                }
            }
        });
    });
}


// Initialize performance trend chart
function initPerformanceTrendChart() {
    const ctx = document.getElementById('performanceTrendChart').getContext('2d');
    
    // Sample data for the last 30 days
    const labels = Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    // Sample data
    const clicksData = [
        820, 832, 901, 934, 1290, 1330, 1320, 
        1450, 1500, 1520, 1600, 1650, 1700, 1750, 
        1800, 1850, 1900, 1950, 2000, 2050, 2100, 
        2150, 2200, 2250, 2300, 2350, 2400, 2450, 
        2500, 2550
    ];
    
    const impressionsData = [
        16000, 16200, 16500, 16800, 17000, 17200, 17500, 
        17800, 18000, 18200, 18500, 18800, 19000, 19200, 
        19500, 19800, 20000, 20200, 20500, 20800, 21000, 
        21200, 21500, 21800, 22000, 22200, 22500, 22800, 
        23000, 23200
    ];
    
    const ctrData = [
        4.1, 4.15, 4.2, 4.25, 4.3, 4.35, 4.4, 
        4.45, 4.5, 4.55, 4.6, 4.65, 4.7, 4.75, 
        4.8, 4.85, 4.9, 4.95, 5.0, 5.05, 5.1, 
        5.15, 5.2, 5.25, 5.3, 5.35, 5.4, 5.45, 
        5.5, 5.55
    ];
    
    const positionData = [
        16.0, 15.9, 15.8, 15.7, 15.6, 15.5, 15.4, 
        15.3, 15.2, 15.1, 15.0, 14.9, 14.8, 14.7, 
        14.6, 14.5, 14.4, 14.3, 14.2, 14.1, 14.0, 
        13.9, 13.8, 13.7, 13.6, 13.5, 13.4, 13.3, 
        13.2, 13.1
    ];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Clicks',
                    data: clicksData,
                    borderColor: '#0066CC',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Impressions (thousands)',
                    data: impressionsData.map(value => value / 1000),
                    borderColor: '#4D94FF',
                    backgroundColor: 'rgba(77, 148, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y1'
                },
                {
                    label: 'CTR (%)',
                    data: ctrData,
                    borderColor: '#00CC66',
                    backgroundColor: 'rgba(0, 204, 102, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y2'
                },
                {
                    label: 'Avg Position',
                    data: positionData,
                    borderColor: '#FF3333',
                    backgroundColor: 'rgba(255, 51, 51, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y3'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Clicks'
                    },
                    grid: {
                        display: false
                    }
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'left',
                    grid: {
                        display: false
                    }
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'CTR (%)'
                    },
                    grid: {
                        display: false
                    }
                },
                y3: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Avg Position'
                    },
                    grid: {
                        display: false
                    },
                    reverse: true
                }
            }
        }
    });
}

// Set up view control buttons
function setupViewControls() {
    const viewControlsContainers = document.querySelectorAll('.view-controls');
    
    viewControlsContainers.forEach(container => {
        const buttons = container.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this container
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Handle specific view changes
                handleViewChange(container, this);
            });
        });
    });
}

// Handle view changes based on button clicks
function handleViewChange(container, activeButton) {
    const parentSection = container.closest('section');
    const sectionClass = parentSection.classList[0];
    
    // Handle specific sections
    switch (sectionClass) {
        case 'winners-losers':
            if (activeButton.textContent.trim() === 'All Practices') {
                document.querySelector('.winners-losers').style.display = 'block';
                document.querySelector('.winners-losers.selected-practice').style.display = 'none';
            } else {
                document.querySelector('.winners-losers').style.display = 'none';
                document.querySelector('.winners-losers.selected-practice').style.display = 'block';
            }
            break;
            
        // Add more cases for other sections as needed
        
        default:
            // For now, just log which view was selected
            console.log(`View changed in ${sectionClass} to: ${activeButton.textContent.trim()}`);
    }
}

// Date and comparison functionality
// Note: These functions are now called from the main DOMContentLoaded event handler

// Initialize date granularity controls
function initDateGranularity() {
    const granularityRadios = document.querySelectorAll('input[name="dateGranularity"]');
    
    if (granularityRadios.length) {
        granularityRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Update date inputs based on selected granularity
                updateDateInputsForGranularity(this.value);
                
                // In a real implementation, this would update the dashboard data
                showNotification(`Date granularity set to: ${this.value}`);
            });
        });
        
        // Initialize with default granularity (month)
        const defaultGranularity = document.querySelector('input[name="dateGranularity"]:checked');
        if (defaultGranularity) {
            updateDateInputsForGranularity(defaultGranularity.value);
        }
    }
}

// Initialize date period buttons (WTD, MTD, YTD) - No longer needed as they're now part of the segmented control
function initDatePeriodButtons() {
    // This function is kept for backward compatibility but no longer does anything
    // as the WTD, MTD, YTD buttons are now part of the date granularity segmented control
}

// Set date range based on selected period (WTD, MTD, YTD)
function setDateRangeFromPeriod(period) {
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    
    if (startDateInput && endDateInput) {
        const today = new Date();
        let startDate = new Date(today);
        
        switch (period) {
            case 'wtd':
                // Week to date - start from beginning of current week
                startDate.setDate(today.getDate() - today.getDay());
                break;
            case 'mtd':
                // Month to date - start from beginning of current month
                startDate.setDate(1);
                break;
            case 'ytd':
                // Year to date - start from beginning of current year
                startDate.setMonth(0, 1);
                break;
        }
        
        // Format dates for input fields
        startDateInput.value = formatDateForInput(startDate);
        endDateInput.value = formatDateForInput(today);
        
        // Update dashboard date info
        updateDashboardDateInfo();
    }
}

// Initialize date range toggle
function initDateRangeToggle() {
    const dateRangeToggle = document.getElementById('dateRangeToggle');
    const dateRangeInputs = document.getElementById('dateRangeInputs');
    const dateGranularity = document.querySelector('.date-granularity');
    
    if (dateRangeToggle && dateRangeInputs) {
        // Set initial state
        dateRangeInputs.style.opacity = dateRangeToggle.checked ? '1' : '0.5';
        dateRangeInputs.style.pointerEvents = dateRangeToggle.checked ? 'auto' : 'none';
        
        // Handle toggle change
        dateRangeToggle.addEventListener('change', function() {
            dateRangeInputs.style.opacity = this.checked ? '1' : '0.5';
            dateRangeInputs.style.pointerEvents = this.checked ? 'auto' : 'none';
            
            // Highlight active date selection method
            if (this.checked) {
                dateGranularity.style.opacity = '0.5';
                showNotification('Using Date Range for calculations');
            } else {
                dateGranularity.style.opacity = '1';
                showNotification('Using Date Granularity for calculations');
            }
        });
    }
}

// Update date inputs based on selected granularity
function updateDateInputsForGranularity(granularity) {
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    
    if (startDateInput && endDateInput) {
        const today = new Date();
        let startDate = new Date();
        
        // Set appropriate date range based on granularity
        switch (granularity) {
            case 'week':
                // Set to beginning of current week
                startDate.setDate(today.getDate() - today.getDay());
                break;
            case 'month':
                // Set to beginning of current month
                startDate.setDate(1);
                break;
            case 'year':
                // Set to beginning of current year
                startDate.setMonth(0, 1);
                break;
            case 'wtd':
                // Week to date - start from beginning of current week
                startDate.setDate(today.getDate() - today.getDay());
                break;
            case 'mtd':
                // Month to date - start from beginning of current month
                startDate.setDate(1);
                break;
            case 'ytd':
                // Year to date - start from beginning of current year
                startDate.setMonth(0, 1);
                break;
        }
        
        // Format dates for input fields (YYYY-MM-DD)
        startDateInput.value = formatDateForInput(startDate);
        endDateInput.value = formatDateForInput(today);
        
        // Update dashboard date info
        updateDashboardDateInfo();
    }
}

// Initialize date input fields
function initDateInputs() {
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    
    if (startDateInput && endDateInput) {
        // Set initial values
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);
        
        startDateInput.value = formatDateForInput(lastMonth);
        endDateInput.value = formatDateForInput(today);
        
        // Add event listeners
        startDateInput.addEventListener('change', function() {
            validateDateRange(startDateInput, endDateInput);
            updateDashboardDateInfo();
        });
        
        endDateInput.addEventListener('change', function() {
            validateDateRange(startDateInput, endDateInput);
            updateDashboardDateInfo();
        });
    }
}

// Initialize comparison controls
function initComparisonControls() {
    const compareToggle = document.getElementById('compareToggle');
    const comparisonOptions = document.getElementById('comparisonOptions');
    const comparisonType = document.getElementById('comparisonType');
    const customPeriodModal = document.getElementById('customPeriodModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const applyCustomPeriodBtn = document.getElementById('applyCustomPeriod');
    
    if (compareToggle && comparisonOptions && comparisonType) {
        // Set initial state
        comparisonOptions.style.display = compareToggle.checked ? 'block' : 'none';
        
        // Handle toggle change
        compareToggle.addEventListener('change', function() {
            comparisonOptions.style.display = this.checked ? 'block' : 'none';
            
            // In a real implementation, this would update the dashboard data
            showNotification(`Comparison ${this.checked ? 'enabled' : 'disabled'}`);
        });
        
        // Handle comparison type change
        comparisonType.addEventListener('change', function() {
            // Check if custom period is selected
            if (this.value === 'custom') {
                // Show custom period modal
                customPeriodModal.style.display = 'block';
                
                // Set default dates
                const today = new Date();
                const lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);
                
                document.getElementById('mainPeriodStart').value = formatDateForInput(lastMonth);
                document.getElementById('mainPeriodEnd').value = formatDateForInput(today);
                
                const twoMonthsAgo = new Date();
                twoMonthsAgo.setMonth(today.getMonth() - 2);
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(today.getMonth() - 1);
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 1);
                
                document.getElementById('comparisonPeriodStart').value = formatDateForInput(twoMonthsAgo);
                document.getElementById('comparisonPeriodEnd').value = formatDateForInput(oneMonthAgo);
            } else {
                // In a real implementation, this would update the dashboard data
                showNotification(`Comparison type set to: ${this.options[this.selectedIndex].text}`);
            }
        });
        
        // Close modal when clicking the X
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                customPeriodModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === customPeriodModal) {
                customPeriodModal.style.display = 'none';
            }
        });
        
        // Apply custom period
        if (applyCustomPeriodBtn) {
            applyCustomPeriodBtn.addEventListener('click', function() {
                const mainStart = document.getElementById('mainPeriodStart').value;
                const mainEnd = document.getElementById('mainPeriodEnd').value;
                const compStart = document.getElementById('comparisonPeriodStart').value;
                const compEnd = document.getElementById('comparisonPeriodEnd').value;
                
                // Validate dates
                if (!mainStart || !mainEnd || !compStart || !compEnd) {
                    showNotification('Please fill in all date fields');
                    return;
                }
                
                // In a real implementation, this would update the dashboard data
                showNotification(`Custom comparison period applied: ${formatDate(new Date(mainStart))} - ${formatDate(new Date(mainEnd))} vs ${formatDate(new Date(compStart))} - ${formatDate(new Date(compEnd))}`);
                
                // Close the modal
                customPeriodModal.style.display = 'none';
            });
        }
    }
}

// GMB toggle functionality removed, replaced by dropdown

// Validate date range to ensure start date is before end date
function validateDateRange(startInput, endInput) {
    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);
    
    if (startDate > endDate) {
        // If start date is after end date, set end date to start date
        endInput.value = startInput.value;
    }
}

// Update dashboard date info display
function updateDashboardDateInfo() {
    const dateInfo = document.querySelector('.date-info');
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    
    if (dateInfo && startDateInput && endDateInput) {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        
        const today = new Date();
        dateInfo.textContent = `Last updated: ${formatDate(today)} | Data range: ${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
}

// Format date as MMM D, YYYY
function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Format date as YYYY-MM-DD for input fields
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Update slider value text
function updateSliderValue(slider, text) {
    const valueDisplay = slider.parentElement.querySelector('.slider-value');
    if (valueDisplay) {
        valueDisplay.textContent = text;
    }
}

// Get compare text based on slider value
function getCompareText(value) {
    // Convert slider value (1-100) to a time period
    const period = Math.round(value / 100 * 12); // Max 12 months
    
    if (period <= 1) {
        return '1 month';
    } else if (period <= 3) {
        return '3 months';
    } else if (period <= 6) {
        return '6 months';
    } else if (period <= 9) {
        return '9 months';
    } else {
        return '12 months';
    }
}

// Checkbox Dropdown functionality
// Note: initCheckboxDropdowns is now called from the main DOMContentLoaded event handler

// Initialize checkbox dropdowns
function initCheckboxDropdowns() {
    const dropdowns = document.querySelectorAll('.checkbox-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
        const selectedOptions = dropdown.querySelector('.selected-options');
        const allCheckbox = dropdown.querySelector('input[id$="-all"]');
        
        // Toggle dropdown menu
        toggle.addEventListener('click', function() {
            menu.classList.toggle('show');
            
            // Close other open dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-menu').classList.remove('show');
                }
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                menu.classList.remove('show');
            }
        });
        
        // Handle checkbox changes
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectedOptions(dropdown);
            });
        });
        
        // Handle "All" checkbox
        if (allCheckbox) {
            allCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Uncheck all other checkboxes
                    checkboxes.forEach(cb => {
                        if (cb !== allCheckbox) {
                            cb.checked = false;
                        }
                    });
                }
                updateSelectedOptions(dropdown);
            });
        }
        
        // Handle clicks on dropdown items
        const dropdownItems = menu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(event) {
                // Prevent the click from closing the dropdown immediately if it's on the checkbox or label
                if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'LABEL') {
                    const checkbox = this.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        // Manually trigger the change event on the checkbox
                        const changeEvent = new Event('change');
                        checkbox.dispatchEvent(changeEvent);
                    }
                }
            });
        });

        // Initialize selected options
        updateSelectedOptions(dropdown);
    });
}

// Update selected options display
function updateSelectedOptions(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    const selectedOptions = dropdown.querySelector('.selected-options');
    const allCheckbox = dropdown.querySelector('input[id$="-all"]');
    
    // Clear selected options
    selectedOptions.innerHTML = '';
    
    // Get selected options
    const selected = Array.from(checkboxes).filter(cb => cb.checked && cb !== allCheckbox);
    
    // Update toggle text
    if (allCheckbox && allCheckbox.checked) {
        toggle.textContent = allCheckbox.nextElementSibling.textContent;
    } else if (selected.length > 0) {
        if (selected.length === 1) {
            toggle.textContent = selected[0].nextElementSibling.textContent;
        } else {
            toggle.textContent = `${selected.length} selected`;
            
            // Add selected options as pills
            selected.forEach(cb => {
                const option = document.createElement('div');
                option.className = 'selected-option';
                option.textContent = cb.nextElementSibling.textContent;
                
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-option';
                removeBtn.textContent = '×';
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    cb.checked = false;
                    updateSelectedOptions(dropdown);
                });
                
                option.appendChild(removeBtn);
                selectedOptions.appendChild(option);
            });
        }
    } else {
        // If nothing selected, default to "All"
        if (allCheckbox) {
            allCheckbox.checked = true;
            toggle.textContent = allCheckbox.nextElementSibling.textContent;
        } else {
            toggle.textContent = 'Select options';
        }
        updateSelectedOptions(dropdown);
    }
}

// Reset all checkbox dropdowns
function resetCheckboxDropdowns() {
    const dropdowns = document.querySelectorAll('.checkbox-dropdown');
    
    dropdowns.forEach(dropdown => {
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
        const allCheckbox = dropdown.querySelector('input[id$="-all"]');
        
        // Uncheck all checkboxes
        checkboxes.forEach(cb => {
            cb.checked = false;
        });
        
        // Check "All" checkbox
        if (allCheckbox) {
            allCheckbox.checked = true;
        }
        
        // Update display
        updateSelectedOptions(dropdown);
    });
}

// Initialize filter buttons
function initFilterButtons() {
    const filterApplyButton = document.querySelector('.filter-apply');
    const filterResetButton = document.querySelector('.filter-reset');
    
    if (filterApplyButton) {
        filterApplyButton.addEventListener('click', function() {
            // In a real implementation, this would apply the selected filters
            console.log('Filters applied');
            
            // For demo purposes, show a notification
            showNotification('Filters applied successfully');
        });
    }
    
    if (filterResetButton) {
        filterResetButton.addEventListener('click', function() {
            // Reset all filter inputs
            const filterInputs = document.querySelectorAll('.filter-group select, .filter-group input[type="text"]');
            filterInputs.forEach(input => {
                if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                } else {
                    input.value = '';
                }
            });
            
            // Reset checkbox dropdowns
            resetCheckboxDropdowns();
            
            // For demo purposes, show a notification
            showNotification('Filters reset successfully');
        });
    }
}

// Show a notification message
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#0066CC';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize download data buttons
function initDownloadDataButtons() {
    const downloadButtons = document.querySelectorAll('.download-data-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the section title to identify which data is being downloaded
            const sectionTitle = this.closest('.section-header').querySelector('h2').textContent;
            
            // In a real implementation, this would trigger a CSV/Excel download
            // For demo purposes, just show a notification
            showNotification(`Downloading ${sectionTitle} data...`);
            
            // Simulate download delay
            setTimeout(() => {
                showNotification(`${sectionTitle} data downloaded successfully`);
            }, 1500);
        });
    });
}

// Initialize load more buttons
function initLoadMoreButtons() {
    const loadMoreButtons = document.querySelectorAll('.load-more-btn');
    
    loadMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent section to identify which table to load more data for
            const section = this.closest('section');
            const sectionTitle = section.querySelector('.section-header h2').textContent;
            
            // Special handling for Practice Performance section
            if (section.classList.contains('practice-performance')) {
                section.classList.toggle('show-all');
                
                // Update button text based on current state
                if (section.classList.contains('show-all')) {
                    this.textContent = 'Show Less';
                    showNotification('Showing all practices');
                } else {
                    this.textContent = 'Load More';
                    showNotification('Showing first 5 practices');
                }
                return;
            }
            
            // In a real implementation, this would load more data from an API
            // For demo purposes, just show a notification
            showNotification(`Loading more data for ${sectionTitle}...`);
            
            // Simulate loading delay
            setTimeout(() => {
                showNotification(`Additional data loaded for ${sectionTitle}`);
            }, 1000);
        });
    });
}
