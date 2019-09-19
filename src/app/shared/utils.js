export function calculaIdadeAMD(dataNasc) {
    
    const anoNasc = parseInt( dataNasc.substr(0,4) );
    const mesNasc = parseInt( dataNasc.substr(5,2) );
    const diaNasc = parseInt( dataNasc.substr(8,2) );

    const hoje = new Date();

    const anoHoje = hoje.getFullYear();
    const mesHoje = hoje.getMonth()+1;
    const diaHoje = hoje.getDate();

    let anosResp = anoHoje - anoNasc;
    let mesesResp = 0;
    let diasResp = 0;
    
    if(mesNasc == mesHoje)
        mesesResp = 0
    else if( mesNasc < mesHoje)
        mesesResp = mesHoje - mesNasc
    else { 
        mesesResp =  12 - ( mesNasc - mesHoje );
        anosResp --;
    };

    if(diaHoje >= diaNasc) diasResp = diaHoje - diaNasc
    else if (diaNasc > diaHoje) {
        diasResp = 30 - ( diaNasc - diaHoje );
        mesesResp --;
    }
    
    let anosIdade = '';
    let mesesIdade = '';
    let diasIdade = '';

    if( anosResp )  anosIdade  = anosResp.toString()  + ' ano(s) ';
    if( mesesResp ) mesesIdade = mesesResp.toString() + ' mes(es) ';
    if( diasResp )  diasIdade  = diasResp.toString()  + ' dia(s)';

    return anosIdade + mesesIdade + diasIdade;
};
