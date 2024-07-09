import React from 'react';
// TODO: consider corporate also => corporate_number is added 

const License: React.FC = () => {
  return (
    <div className='text-center'>
      <h1 className='mt-9 text-center text-2xl'>令和{"〇〇"}年分 寄付控除に関する証明書</h1>
      {/* <div className='text-center text-2xl p-5'> 
        <p className='text-center'>寄付者名前 : {"コイララ ビスワス"}</p>
        <p className='text-center'>寄付者住所 : {"神奈川県〇〇市〇〇区〇〇○町丸山荘203"}</p>
      </div> */}
      {/* table for basic info */}
      <div className='m-10 text-xl w-100'>
        <div className='text-left'>
          <div>
            <p>法人番号 : {"123456789??"}</p>
            <p>認定NPO法人多文化共生ネットワークかながわ</p>
          </div>
        <div className='text-right'>{"Logo Here"}</div>
        </div>
      </div>
      <div className='m-10 text-xl w-100'>
        <div className='text-left'>
          <p>寄付者名 : {"コイララ ビスワス"}</p>
          <p>寄付者住所 : {"神奈川県〇〇市〇〇区丸の内ドメスティック119"}</p>
        </div>
      </div>
      <div className="bg-white flex justify-center mt-10 ">
        <table className="text-left text-base whitespace-nowrap border-black border table">
          <thead className="uppercase tracking-wider border-b-2 border-black border-t ">
            <tr>
              <th scope="col" className="px-6 py-4 border-x border-black">寄付ID</th>
              <th scope="col" className="px-6 py-4 border-x border-black">事業</th>
              <th scope="col" className="px-6 py-4 border-x border-black">額</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black">
              <th scope="row" className="px-6 py-4 border-x border-black">{"12"}</th>
              <td className="px-6 py-4 border-x border-black">{"オルタボイス"}</td>
              <td className="px-6 py-4 border-x border-black">{"2000"}円</td>
            </tr>
            <tr className="border-b border-black">
              <th scope="row" className="px-6 py-4 border-x border-black">{"13"}</th>
              <td className="px-6 py-4 border-x border-black">{"生活困窮者"}</td>
              <td className="px-6 py-4 border-x border-black">{"2000"}円</td>
            </tr>
            <tr className="border-b border-black">
              <th scope="row" className="px-6 py-4 border-x border-black">{"14"}</th>
              <td className="px-6 py-4 border-x border-black">{"ガイダンス"}</td>
              <td className="px-6 py-4 border-x border-black">{"2000"}円</td>
            </tr>
            
          </tbody>
          <tfoot className="border-t-2 border-black">
            <tr>
              <th className="px-6 py-4 border-x border-black">合計</th>
              <td className="px-6 py-4 border-x border-black"></td>
              <td className="px-6 py-4 border-x border-black">{"6000"}円</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
        <p className='m-10 text-2xl'>上記の寄付があったことを証明する</p>
      </div>
    </div>
  );
};

export default License;
