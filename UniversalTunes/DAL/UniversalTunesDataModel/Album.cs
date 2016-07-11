//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UniversalTunesDataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Album
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Album()
        {
            this.Songs = new HashSet<Song>();
        }
    
        public int Id { get; set; }
        public string UId { get; set; }
        public string Name { get; set; }
        public System.DateTime Date { get; set; }
        public string AlbumArtWork { get; set; }
        public int PriceId { get; set; }
        public string ArtistUid { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Song> Songs { get; set; }
        public virtual PriceType PriceType { get; set; }
    }
}
