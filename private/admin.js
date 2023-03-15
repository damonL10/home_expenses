window.onload = async () => {
    await loadAdminName();
    loadBills();
    initNewBill();
    loadYearlyRecords();
    loadMonthlyRecords();
    loadSingleMonthRecords()
};


async function loadAdminName() {
    const resp = await fetch("/adminname");
    if(resp.status === 200) {
        const admin = await resp.json();
        const welcomeTitle = document.createElement("span");
        welcomeTitle.textContent = `${admin.username}さん、こんにちは！！ ԅ(‾⌣‾ԅ)`;
        document.querySelector("#welcome").appendChild(welcomeTitle);
    }
};

async function loadBills() {
    const resp = await fetch("/bills");
    const bills = await resp.json();
    // console.log(bills);

    const firstItemHtmlStr = /*html*/ `<div class="bill">
    <b>${bills[0].transaction_date}</b>
    <div class="bill_category"><span class="item_category">${bills[0].category_name}</span><span class="item_amount">$<span id="amount-${bills[0].id}" contenteditable="true">${bills[0].amount}</span></span>
    <i class="button-div">
    <i class="bi bi-pen" data-id="id-${bills[0].id}"></i>
    <i class="bi bi-trash" data-id="id-${bills[0].id}"></i>
    </i></div>`;
    
    // console.log(`The first item id is ${bills[0].id}`);
    
    let nextItemHtmlStr = ``;
    for(let i = 1; i < bills.length; i++) {
        const nextItemStr = (!(bills[i-1].transaction_date === bills[i].transaction_date)) ? 
        /*html*/ `</div><div class="bill">
        <b>${bills[i].transaction_date}</b>
        <div class="bill_category"><span class="item_category">${bills[i].category_name}</span><span class="item_amount">$<span id="amount-${bills[i].id}" contenteditable="true">${bills[i].amount}</span></span>
        <i class="button-div">
        <i class="bi bi-pen" data-id="id-${bills[i].id}"></i>
        <i class="bi bi-trash" data-id="id-${bills[i].id}"></i>
        </i></div>` : 
        `<div class="bill_category"><span class="item_category">${bills[i].category_name}</span><span class="item_amount">$<span id="amount-${bills[i].id}" contenteditable="true">${bills[i].amount}</span></span>
        <i class="button-div">
        <i class="bi bi-pen" data-id="id-${bills[i].id}"></i>
        <i class="bi bi-trash" data-id="id-${bills[i].id}"></i>
        </i></div>`;
    
        nextItemHtmlStr += `${nextItemStr}`;
    };
    const htmlStr = firstItemHtmlStr + nextItemHtmlStr;
    document.querySelector("#bill-board").innerHTML = htmlStr;

    document.querySelectorAll(".bill .bi-pen").forEach((element) =>
        element.addEventListener("click", async (event) => {
        // console.log("click");
            const penButton = event.target;
            const penId = penButton.dataset.id;
            // console.log(penId, "updated");
            const id = penId.split("-")[1];
            const billEle = document.querySelector(`#amount-${id}`);
            const newAmount = billEle.textContent.trim();
            // console.log("new amount is", newAmount);
            await fetch(`/bills/update/${id}`, {
                method: "PUT",
                headers: { "content-type": "application/json;charset=utf-8", 
                },
                body: JSON.stringify({ newAmount }),
            });

        })
    );

    
    document.querySelectorAll(".bill .bi-trash").forEach((element) =>
        element.addEventListener("click", async (event) => {
        // console.log("click");
        const trashButton = event.target;
        const trashId = trashButton.dataset.id;
        // console.log(trashId, "deleted");
        const id = trashId.split("-")[1];
  
            await fetch(`/bills/${id}`, {
                method: "DELETE",
                headers: { "content-type": "application/json;charset=utf-8", 
                },
            });
        loadBills();    
        })
    );
};



function initNewBill() {
    document.querySelector("#form_create_bill").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const transactionDate = form.transaction_date.value;
        const categoryId1 = form.category_box_1.value;
        const amount1 = form.amount_1.value;
        const categoryId2 = form.category_box_2.value;
        const amount2 = form.amount_2.value;
        const categoryId3 = form.category_box_3.value;
        const amount3 = form.amount_3.value;
        const categoryId4 = form.category_box_4.value;
        const amount4 = form.amount_4.value;
        const categoryId5 = form.category_box_5.value;
        const amount5 = form.amount_5.value;
        const categoryId6 = form.category_box_6.value;
        const amount6 = form.amount_6.value;
        const categoryId7 = form.category_box_7.value;
        const amount7 = form.amount_7.value;
        const categoryId8 = form.category_box_8.value;
        const amount8 = form.amount_8.value;
        const categoryId9 = form.category_box_9.value;
        const amount9 = form.amount_9.value;
        const categoryId10 = form.category_box_10.value;
        const amount10 = form.amount_10.value;
        const categoryId11 = form.category_box_11.value;
        const amount11 = form.amount_11.value;
        const categoryId12 = form.category_box_12.value;
        const amount12 = form.amount_12.value;
        const formBody = { 
            transaction_date: transactionDate,
            category_id_1: categoryId1,
            amount_1: amount1,
            category_id_2: categoryId2,
            amount_2: amount2,
            category_id_3: categoryId3,
            amount_3: amount3,
            category_id_4: categoryId4,
            amount_4: amount4,
            category_id_5: categoryId5,
            amount_5: amount5,
            category_id_6: categoryId6,
            amount_6: amount6,
            category_id_7: categoryId7,
            amount_7: amount7,
            category_id_8: categoryId8,
            amount_8: amount8,
            category_id_9: categoryId9,
            amount_9: amount9,
            category_id_10: categoryId10,
            amount_10: amount10,
            category_id_11: categoryId11,
            amount_11: amount11,
            category_id_12: categoryId12,
            amount_12: amount12
        };

        const resp = await fetch("/bills", {
            method: "POST",
            headers: { 
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(formBody),
        });

        const data = await resp.json();
        // console.log(data);

        loadBills();
        form.reset();
        alert("你入咗一條數喇!!");
    });
};




async function loadYearlyRecords() {
    document.querySelector("#yearly_form").addEventListener("submit", async (event) => {
       event.preventDefault();
       const form = event.target
       const year = form.yearly_year.value;
       const queryStr = `?year=${year}`;
    const resp = await fetch(`/bills/yearlyrecord${queryStr}`);
    const yearlyRecords = await resp.json();
    // console.log(yearlyRecords);

    let recordHtmlStr = ``;
        for (const record of yearlyRecords) {
                recordHtmlStr += /*html*/ `<tr><td class="yearly-record">${record.category_name}</td><td class="yearly-record">$${record.sub_total}</td></tr>`;
        };
    document.querySelector("#yearly_record").innerHTML = recordHtmlStr;
    
    loadYearlyRecords();
    });
};


async function loadMonthlyRecords() {
    document.querySelector("#monthly_form").addEventListener("submit", async (event) => {
       event.preventDefault();
       const form = event.target
       const year = form.monthly_year.value;
       const queryStr = `?year=${year}`;
    const resp = await fetch(`/bills/monthlyrecord${queryStr}`);
    const monthlyRecords = await resp.json();
    // console.log(monthlyRecords);

    const chartBody = document.getElementById('monthlyChart');
    let dataArray = [];
    for (let i = 0; i < monthlyRecords.length; i++) {
      const dataObj = {y: monthlyRecords[i].category_name, jan: monthlyRecords[i].jan_sub_total, feb: monthlyRecords[i].feb_sub_total, mar: monthlyRecords[i].mar_sub_total, apr: monthlyRecords[i].apr_sub_total, may: monthlyRecords[i].may_sub_total, jun: monthlyRecords[i].jun_sub_total, jul: monthlyRecords[i].jul_sub_total, aug: monthlyRecords[i].aug_sub_total, sep: monthlyRecords[i].sep_sub_total, oct: monthlyRecords[i].oct_sub_total, nov: monthlyRecords[i].nov_sub_total, dec: monthlyRecords[i].dec_sub_total};  
      dataArray.push(dataObj);
    };
    const dataRecords = dataArray;

    let categoryArray = [];
    for (let i = 0; i < monthlyRecords.length; i++) {
        const categoryItems = monthlyRecords[i].category_name;
        categoryArray.push(categoryItems);
    };
    const labelsArray = categoryArray;
    const config = {
      type: 'bar',
      data: {
        labels: labelsArray,
        datasets: [{
          label: '一月',
          data: dataRecords,
          parsing: {
            xAxisKey: 'jan'
          },
          backgroundColor: '#EF86BE',
          barPercentage: 1,
          categoryPercentage: 1,
        }, {
          label: '二月',
          data: dataRecords,
          parsing: {
            xAxisKey: 'feb'
          },
          backgroundColor: '#86EFC1',
          barPercentage: 1,
          categoryPercentage: 1,
        }, {
          label: '三月',
          data: dataRecords,
          parsing: {
            xAxisKey: 'mar'
          },
          backgroundColor: '#D771CD',
          barPercentage: 1,
          categoryPercentage: 1,
        }, {
            label: '四月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'apr'
            },
            backgroundColor: '#FFFF66',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '五月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'may'
            },
            backgroundColor: '#5889F9',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '六月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'jun'
            },
            backgroundColor: '#F5C275',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '七月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'jul'
            },
            backgroundColor: '#FF99CC',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '八月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'aug'
            },
            backgroundColor: '#FD865A',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '九月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'sep'
            },
            backgroundColor: '#F790F7',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '十月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'oct'
            },
            backgroundColor: '#FD6262',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '十一月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'nov'
            },
            backgroundColor: '#EFE886',
            barPercentage: 1,
            categoryPercentage: 1,
          }, {
            label: '十二月',
            data: dataRecords,
            parsing: {
              xAxisKey: 'dec'
            },
            backgroundColor: '#86A6EF',
            barPercentage: 1,
            categoryPercentage: 1,
          }]
      },
      options: {
        indexAxis: 'y',
      }
  
    };

    new Chart(chartBody, config);
    
    });
};

async function loadSingleMonthRecords() {
  document.querySelector("#single_month_form").addEventListener("submit", async (event) => {
     event.preventDefault();
     const form = event.target
     const input_month = `0${form.single_month.value}`;
     const month = input_month.slice(-2);
     const year = form.single_year.value;
     const queryStr = `?month=${month}&year=${year}`;
    //  console.log(queryStr);
  const resp = await fetch(`/bills/singlemonthrecord${queryStr}`);
  const singleMonthRecords = await resp.json();
  // console.log(singleMonthRecords);

  let recordHtmlStr = ``;
      for (const record of singleMonthRecords) {
              recordHtmlStr += /*html*/ `<tr><td class="single-month-record">${record.category_name}</td><td class="single-month-record">$${record.sub_total}</td></tr>`;
      };
  document.querySelector("#single_month_record").innerHTML = recordHtmlStr;
  
  loadSingleMonthRecords();
  });
};
