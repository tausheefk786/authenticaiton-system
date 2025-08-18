export default function userprofile({params}: any){
    
    return (
      <div className="flex flex-col items-center
      justify-center min-h-screen py-2">
        <h1>profile</h1>
        <hr/>
        <p className="text-4xl">profile page</p>
        <span className="p-2 rounded-2xl bg-orange-400 ml-2">{params.id}</span>
      </div>
    );
}