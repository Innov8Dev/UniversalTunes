using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Innov8Lib
{
    public static class NameSplitting
    {
        /// <summary>
        /// Splits the camel case.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static string SplitCamelCase(string value)
        {
            if (value == null)
                return null;
            return Regex.Replace(Regex.Replace(value, @"(\P{Ll})(\P{Ll}\p{Ll})", "$1 $2"), @"(\p{Ll})(\P{Ll})", "$1 $2");
        }

        public static string SplitCamelCase(object value)
        {
            if (value == null)
                return null;
            return SplitCamelCase(value.ToString());
        }
    }
}
