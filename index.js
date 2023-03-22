

class Produto{

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editid= null;

    }

    salvar(){
       let produto = this.lerdados();

       if(this.validacampos(produto)){
        if(this.editid == null){
            this.adicionar(produto);

       }else{
            this.atualizar(this.editid, produto);
        }
       }

       this.listatabela();
       this.cancelar()
    }

    adicionar(produto){
        produto.valor = parseFloat(produto.valor)
        this.arrayProdutos.push(produto);
        this.id++;
    }

    lerdados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeproduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('price').value;


        return produto;
    }

    validacampos(produto){
        let msg = '';
        if(produto.nomeproduto == ''){
            msg += '-Informe o nome\n';
        }
        if(produto.valor == '' ){
            msg += '-Informe o preço\n';
        }
        if(msg != ''){
            alert(msg);
            return false
        }

        return true


    }
    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('price').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editid = null;
    }
   
    
    
    listatabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeproduto;
            td_valor.innerText = this.arrayProdutos[i].valor;

            td_id.classList.add('center');

            var imgedit = document.createElement('img');
            imgedit.src = 'assets/edit.png';
            imgedit.setAttribute('onclick','product.editacao('+ JSON.stringify(this.arrayProdutos[i])+')')

            var imgdelete = document.createElement('img');
            imgdelete.src = 'assets/delete.png';
            imgdelete.setAttribute('onclick','product.lixo('+this.arrayProdutos[i].id+')')
            

            td_acoes.appendChild(imgedit);
            td_acoes.appendChild(imgdelete);
            td_acoes.classList.add('center');
        }
    }
    atualizar(id,produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeproduto = produto.nomeproduto;
                this.arrayProdutos[i].valor = produto.valor;
            }
        }
        
    }
    editacao(dados){
        this.editid = dados.id

        document.getElementById('produto').value = dados.nomeproduto;
        document.getElementById('price').value = dados.valor;

        document.getElementById('btn1').innerText = 'Atualizar';
        
    }



   

    lixo(id){

        if(confirm('Deseja realmente deletar o produto de ID: ' + id +'?')){
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
        }
        
    }
}

var product = new Produto();