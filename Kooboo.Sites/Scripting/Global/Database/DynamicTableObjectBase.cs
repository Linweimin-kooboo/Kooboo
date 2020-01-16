﻿using Kooboo.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kooboo.Sites.Scripting.Global.Database
{
    public abstract class DynamicTableObjectBase
    {
        public IDictionary<string, object> obj { get; set; }

        public Dictionary<string, object> Values
        {
            get
            {
                return this.obj.ToDictionary(o => o.Key, o => o.Value);
            }
        }

        internal abstract object GetValueFromDict(string key);

        public object this[string key]
        {
            get
            {
                return GetValueFromDict(key);
            }
            set
            {
                this.obj[key] = value;
            }
        }

        public object GetValue(string FieldName)
        {
            return GetValueFromDict(FieldName);
        }

        public object GetValue(string FieldName, RenderContext Context)
        {
            return GetValueFromDict(FieldName);
        }

        public void SetValue(string FieldName, object Value)
        {
            obj[FieldName] = Value;
        }
    }
}
