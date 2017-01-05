var items = [];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function loadItems(callback)
{
	chrome.storage.local.get('list',function(arr){
		items = arr.list;
		callback();
	});
}
function addItem(str, val)
{
	var item = document.createElement('LI');
	var p = document.createElement('P');
	p.innerHTML = str;
	var chk = document.createElement('INPUT');
	chk.type='checkbox';
	chk.className='chk';
	chk.checked = val;
	chk.name = str;
	chk.onclick = function(){
		items[chk.name] = !items[chk.name];
		saveItems(items,function(){});
	}
	item.appendChild(chk);
	item.appendChild(p);
	var list = document.getElementById('list');
	list.appendChild(item);
}
function saveItems(arr,callback)
{
	chrome.storage.local.set({list:arr},callback);
}
function loadDate()
{
	var d = new Date();
	var year = d.getFullYear();
	var day = d.getDate();	
	var mon = months[d.getMonth()];
	var str = day +' '+mon+' '+ year;
	document.getElementById('date').innerHTML = str;
}
function go()
{
	document.getElementById('clear').onclick = function(){
		var chks = document.getElementsByClassName('chk');
		for (i=0;i<chks.length;i++)
		{
			chks[i].checked = false;
		}
		for (i in items)
		{
			items[i] = false;
		}
		saveItems(items,function(){});
	}
	loadDate();
	loadItems(function(){
		for (i in items)
		{
			addItem(i,items[i]);
		}
	});
}
go();